/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { catchError } from 'rxjs/operators/catchError';
import { tap } from 'rxjs/operators/tap';
import { finalize } from 'rxjs/operators/finalize';
import { map } from 'rxjs/operators/map';
import { share } from 'rxjs/operators/share';
import { Injectable, Optional, SecurityContext, SkipSelf } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { of as observableOf } from 'rxjs/observable/of';
import { _throw as observableThrow } from 'rxjs/observable/throw';
/**
 * Returns an exception to be thrown in the case when attempting to
 * load an icon with a name that cannot be found.
 * @docs-private
 * @param iconName
 * @returns Error
 */
export function getMatIconNameNotFoundError(iconName) {
    return Error("Unable to find icon with the name \"" + iconName + "\"");
}
/**
 * Returns an exception to be thrown when the consumer attempts to use
 * `<mat-icon>` without including @angular/http.
 * @docs-private
 * @returns Error
 */
export function getMatIconNoHttpProviderError() {
    return Error('Could not find HttpClient provider for use with Cui icons. ' +
        'Please include the HttpClientModule from @angular/common/http in your ' +
        'app imports.');
}
/**
 * Returns an exception to be thrown when a URL couldn't be sanitized.
 * @param url URL that was attempted to be sanitized.
 * @docs-private
 * @returns Error
 */
export function getMatIconFailedToSanitizeError(url) {
    return Error("The URL provided to CuiIconRegistry was not trusted as a resource URL " +
        ("via Angular's DomSanitizer. Attempted URL was \"" + url + "\"."));
}
/**
 * Configuration for an icon, including the URL and possibly the cached SVG element.
 * @docs-private
 */
var /**
 * Configuration for an icon, including the URL and possibly the cached SVG element.
 * @docs-private
 */
SvgIconConfig = (function () {
    function SvgIconConfig(url) {
        this.url = url;
        this.svgElement = null;
    }
    return SvgIconConfig;
}());
/**
 * Service to register and display icons used by the <mat-icon> component.
 * - Registers icon URLs by namespace and name.
 * - Registers icon set URLs by namespace.
 * - Registers aliases for CSS classes, for use with icon fonts.
 * - Loads icons from URLs and extracts individual icons from icon sets.
 */
var CuiIconRegistry = (function () {
    function CuiIconRegistry(_httpClient, _sanitizer) {
        this._httpClient = _httpClient;
        this._sanitizer = _sanitizer;
        /**
             * URLs and cached SVG elements for individual icons.
             * Keys are of the format "[namespace]:[icon]".
             */
        this._svgIconConfigs = new Map();
        /**
             * SvgIconConfig objects and cached SVG elements for icon sets, keyed by namespace.
             * Multiple icon sets can be registered under the same namespace.
             */
        this._iconSetConfigs = new Map();
        /** Cache for icons loaded by direct URLs. */
        this._cachedIconsByUrl = new Map();
        /** In-progress icon fetches. Used to coalesce multiple requests to the same URL. */
        this._inProgressUrlFetches = new Map();
        /** Map from font identifiers to their CSS class names. Used for icon fonts. */
        this._fontCssClassesByAlias = new Map();
        /**
             * The CSS class to apply when an <mat-icon> component has no icon name, url, or font specified.
             * The default 'material-icons' value assumes that the material icon font has been loaded as
             * described at http://google.github.io/material-design-icons/#icon-font-for-the-web
             */
        this._defaultFontSetClass = 'material-icons';
    }
    /**
     * Registers an icon by URL in the default namespace.
     * @param iconName Name under which the icon should be registered.
     * @param url
     * @returns SvgIcon
     */
    /**
         * Registers an icon by URL in the default namespace.
         * @param iconName Name under which the icon should be registered.
         * @param url
         * @returns SvgIcon
         */
    CuiIconRegistry.prototype.addSvgIcon = /**
         * Registers an icon by URL in the default namespace.
         * @param iconName Name under which the icon should be registered.
         * @param url
         * @returns SvgIcon
         */
    function (iconName, url) {
        return this.addSvgIconInNamespace('', iconName, url);
    };
    /**
     * Registers an icon by URL in the specified namespace.
     * @param namespace Namespace in which the icon should be registered.
     * @param iconName Name under which the icon should be registered.
     * @param url
     * @returns SvgIcon
     */
    /**
         * Registers an icon by URL in the specified namespace.
         * @param namespace Namespace in which the icon should be registered.
         * @param iconName Name under which the icon should be registered.
         * @param url
         * @returns SvgIcon
         */
    CuiIconRegistry.prototype.addSvgIconInNamespace = /**
         * Registers an icon by URL in the specified namespace.
         * @param namespace Namespace in which the icon should be registered.
         * @param iconName Name under which the icon should be registered.
         * @param url
         * @returns SvgIcon
         */
    function (namespace, iconName, url) {
        var key = iconKey(namespace, iconName);
        this._svgIconConfigs.set(key, new SvgIconConfig(url));
        return this;
    };
    /**
     * Registers an icon set by URL in the default namespace.
     * @param url
     * @returns SvgIconSet
     */
    /**
         * Registers an icon set by URL in the default namespace.
         * @param url
         * @returns SvgIconSet
         */
    CuiIconRegistry.prototype.addSvgIconSet = /**
         * Registers an icon set by URL in the default namespace.
         * @param url
         * @returns SvgIconSet
         */
    function (url) {
        return this.addSvgIconSetInNamespace('', url);
    };
    /**
     * Registers an icon set by URL in the specified namespace.
     * @param namespace Namespace in which to register the icon set.
     * @param url
     * @returns SvgIconSet
     */
    /**
         * Registers an icon set by URL in the specified namespace.
         * @param namespace Namespace in which to register the icon set.
         * @param url
         * @returns SvgIconSet
         */
    CuiIconRegistry.prototype.addSvgIconSetInNamespace = /**
         * Registers an icon set by URL in the specified namespace.
         * @param namespace Namespace in which to register the icon set.
         * @param url
         * @returns SvgIconSet
         */
    function (namespace, url) {
        var config = new SvgIconConfig(url);
        var configNamespace = this._iconSetConfigs.get(namespace);
        if (configNamespace) {
            configNamespace.push(config);
        }
        else {
            this._iconSetConfigs.set(namespace, [config]);
        }
        return this;
    };
    /**
     * Defines an alias for a CSS class name to be used for icon fonts. Creating an matIcon
     * component with the alias as the fontSet input will cause the class name to be applied
     * to the <mat-icon> element.
     *
     * @param alias Alias for the font.
     * @param className Class name override to be used instead of the alias.
     * @returns registry
     */
    /**
         * Defines an alias for a CSS class name to be used for icon fonts. Creating an matIcon
         * component with the alias as the fontSet input will cause the class name to be applied
         * to the <mat-icon> element.
         *
         * @param alias Alias for the font.
         * @param className Class name override to be used instead of the alias.
         * @returns registry
         */
    CuiIconRegistry.prototype.registerFontClassAlias = /**
         * Defines an alias for a CSS class name to be used for icon fonts. Creating an matIcon
         * component with the alias as the fontSet input will cause the class name to be applied
         * to the <mat-icon> element.
         *
         * @param alias Alias for the font.
         * @param className Class name override to be used instead of the alias.
         * @returns registry
         */
    function (alias, className) {
        if (className === void 0) { className = alias; }
        this._fontCssClassesByAlias.set(alias, className);
        return this;
    };
    /**
     * Returns the CSS class name associated with the alias by a previous call to
     * registerFontClassAlias. If no CSS class has been associated, returns the alias unmodified.
     * @param {string} alias
     * @returns className
     */
    /**
         * Returns the CSS class name associated with the alias by a previous call to
         * registerFontClassAlias. If no CSS class has been associated, returns the alias unmodified.
         * @param {string} alias
         * @returns className
         */
    CuiIconRegistry.prototype.classNameForFontAlias = /**
         * Returns the CSS class name associated with the alias by a previous call to
         * registerFontClassAlias. If no CSS class has been associated, returns the alias unmodified.
         * @param {string} alias
         * @returns className
         */
    function (alias) {
        return this._fontCssClassesByAlias.get(alias) || alias;
    };
    /**
     * Sets the CSS class name to be used for icon fonts when an <mat-icon> component does not
     * have a fontSet input value, and is not loading an icon by name or URL.
     *
     * @param className
     * @returns registry
     */
    /**
         * Sets the CSS class name to be used for icon fonts when an <mat-icon> component does not
         * have a fontSet input value, and is not loading an icon by name or URL.
         *
         * @param className
         * @returns registry
         */
    CuiIconRegistry.prototype.setDefaultFontSetClass = /**
         * Sets the CSS class name to be used for icon fonts when an <mat-icon> component does not
         * have a fontSet input value, and is not loading an icon by name or URL.
         *
         * @param className
         * @returns registry
         */
    function (className) {
        this._defaultFontSetClass = className;
        return this;
    };
    /**
     * Returns the CSS class name to be used for icon fonts when an <mat-icon> component does not
     * have a fontSet input value, and is not loading an icon by name or URL.
     * @returns string
     */
    /**
         * Returns the CSS class name to be used for icon fonts when an <mat-icon> component does not
         * have a fontSet input value, and is not loading an icon by name or URL.
         * @returns string
         */
    CuiIconRegistry.prototype.getDefaultFontSetClass = /**
         * Returns the CSS class name to be used for icon fonts when an <mat-icon> component does not
         * have a fontSet input value, and is not loading an icon by name or URL.
         * @returns string
         */
    function () {
        return this._defaultFontSetClass;
    };
    /**
     * Returns an Observable that produces the icon (as an `<svg>` DOM element) from the given URL.
     * The response from the URL may be cached so this will not always cause an HTTP request, but
     * the produced element will always be a new copy of the originally fetched icon. (That is,
     * it will not contain any modifications made to elements previously returned).
     *
     * @param safeUrl URL from which to fetch the SVG icon.
     * @returns SvgIcon
     */
    /**
         * Returns an Observable that produces the icon (as an `<svg>` DOM element) from the given URL.
         * The response from the URL may be cached so this will not always cause an HTTP request, but
         * the produced element will always be a new copy of the originally fetched icon. (That is,
         * it will not contain any modifications made to elements previously returned).
         *
         * @param safeUrl URL from which to fetch the SVG icon.
         * @returns SvgIcon
         */
    CuiIconRegistry.prototype.getSvgIconFromUrl = /**
         * Returns an Observable that produces the icon (as an `<svg>` DOM element) from the given URL.
         * The response from the URL may be cached so this will not always cause an HTTP request, but
         * the produced element will always be a new copy of the originally fetched icon. (That is,
         * it will not contain any modifications made to elements previously returned).
         *
         * @param safeUrl URL from which to fetch the SVG icon.
         * @returns SvgIcon
         */
    function (safeUrl) {
        var _this = this;
        var url = this._sanitizer.sanitize(SecurityContext.RESOURCE_URL, safeUrl);
        if (!url) {
            throw getMatIconFailedToSanitizeError(safeUrl);
        }
        var cachedIcon = this._cachedIconsByUrl.get(url);
        if (cachedIcon) {
            return observableOf(cloneSvg(cachedIcon));
        }
        if (!url) {
            return null;
        }
        return this._loadSvgIconFromConfig(new SvgIconConfig(safeUrl)).pipe(tap(function (svg) { return _this._cachedIconsByUrl.set(url, svg); }), map(function (svg) { return cloneSvg(svg); }));
    };
    /**
     * Returns an Observable that produces the icon (as an `<svg>` DOM element) with the given name
     * and namespace. The icon must have been previously registered with addIcon or addIconSet;
     * if not, the Observable will throw an error.
     *
     * @param name Name of the icon to be retrieved.
     * @param namespace Namespace in which to look for the icon.
     * @returns Observable
     */
    /**
         * Returns an Observable that produces the icon (as an `<svg>` DOM element) with the given name
         * and namespace. The icon must have been previously registered with addIcon or addIconSet;
         * if not, the Observable will throw an error.
         *
         * @param name Name of the icon to be retrieved.
         * @param namespace Namespace in which to look for the icon.
         * @returns Observable
         */
    CuiIconRegistry.prototype.getNamedSvgIcon = /**
         * Returns an Observable that produces the icon (as an `<svg>` DOM element) with the given name
         * and namespace. The icon must have been previously registered with addIcon or addIconSet;
         * if not, the Observable will throw an error.
         *
         * @param name Name of the icon to be retrieved.
         * @param namespace Namespace in which to look for the icon.
         * @returns Observable
         */
    function (name, namespace) {
        if (namespace === void 0) { namespace = ''; }
        // Return (copy of) cached icon if possible.
        var key = iconKey(namespace, name);
        var config = this._svgIconConfigs.get(key);
        if (config) {
            return this._getSvgFromConfig(config);
        }
        // See if we have any icon sets registered for the namespace.
        var iconSetConfigs = this._iconSetConfigs.get(namespace);
        if (iconSetConfigs) {
            return this._getSvgFromIconSetConfigs(name, iconSetConfigs);
        }
        return observableThrow(getMatIconNameNotFoundError(key));
    };
    /**
     * Returns the cached icon for a SvgIconConfig if available, or fetches it from its URL if not.
     * @param config
     * @returns cachedIcon
     */
    /**
         * Returns the cached icon for a SvgIconConfig if available, or fetches it from its URL if not.
         * @param config
         * @returns cachedIcon
         */
    CuiIconRegistry.prototype._getSvgFromConfig = /**
         * Returns the cached icon for a SvgIconConfig if available, or fetches it from its URL if not.
         * @param config
         * @returns cachedIcon
         */
    function (config) {
        if (config.svgElement) {
            // We already have the SVG element for this icon, return a copy.
            return observableOf(cloneSvg(config.svgElement));
        }
        // Fetch the icon from the config's URL, cache it, and return a copy.
        return this._loadSvgIconFromConfig(config).pipe(tap(function (svg) { return config.svgElement = svg; }), map(function (svg) { return cloneSvg(svg); }));
    };
    /**
     * Attempts to find an icon with the specified name in any of the SVG icon sets.
     * First searches the available cached icons for a nested element with a matching name, and
     * if found copies the element to a new <svg> element. If not found, fetches all icon sets
     * that have not been cached, and searches again after all fetches are completed.
     * The returned Observable produces the SVG element if possible, and throws
     * an error if no icon with the specified name can be found.
     * @param name
     * @param iconSetConfigs
     * @returns SvgElement
     */
    /**
         * Attempts to find an icon with the specified name in any of the SVG icon sets.
         * First searches the available cached icons for a nested element with a matching name, and
         * if found copies the element to a new <svg> element. If not found, fetches all icon sets
         * that have not been cached, and searches again after all fetches are completed.
         * The returned Observable produces the SVG element if possible, and throws
         * an error if no icon with the specified name can be found.
         * @param name
         * @param iconSetConfigs
         * @returns SvgElement
         */
    CuiIconRegistry.prototype._getSvgFromIconSetConfigs = /**
         * Attempts to find an icon with the specified name in any of the SVG icon sets.
         * First searches the available cached icons for a nested element with a matching name, and
         * if found copies the element to a new <svg> element. If not found, fetches all icon sets
         * that have not been cached, and searches again after all fetches are completed.
         * The returned Observable produces the SVG element if possible, and throws
         * an error if no icon with the specified name can be found.
         * @param name
         * @param iconSetConfigs
         * @returns SvgElement
         */
    function (name, iconSetConfigs) {
        var _this = this;
        // For all the icon set SVG elements we've fetched, see if any contain an icon with the
        // requested name.
        var namedIcon = this._extractIconWithNameFromAnySet(name, iconSetConfigs);
        if (namedIcon) {
            // We could cache namedIcon in _svgIconConfigs, but since we have to make a copy every
            // time anyway, there's probably not much advantage compared to just always extracting
            // it from the icon set.
            return observableOf(namedIcon);
        }
        // Not found in any cached icon sets. If there are icon sets with URLs that we haven't
        // fetched, fetch them now and look for iconName in the results.
        var iconSetFetchRequests = iconSetConfigs
            .filter(function (iconSetConfig) { return !iconSetConfig.svgElement; })
            .map(function (iconSetConfig) {
            return _this._loadSvgIconSetFromConfig(iconSetConfig).pipe(catchError(function (err) {
                var url = _this._sanitizer.sanitize(SecurityContext.RESOURCE_URL, iconSetConfig.url);
                // Swallow errors fetching individual URLs so the combined Observable won't
                // necessarily fail.
                console.log("Loading icon set URL: " + url + " failed: " + err);
                return observableOf(null);
            }), tap(function (svg) {
                // Cache the SVG element.
                if (svg) {
                    iconSetConfig.svgElement = svg;
                }
            }));
        });
        // Fetch all the icon set URLs. When the requests complete, every IconSet should have a
        // cached SVG element (unless the request failed), and we can check again for the icon.
        return forkJoin(iconSetFetchRequests).pipe(map(function () {
            var foundIcon = _this._extractIconWithNameFromAnySet(name, iconSetConfigs);
            if (!foundIcon) {
                throw getMatIconNameNotFoundError(name);
            }
            return foundIcon;
        }));
    };
    /**
     * Searches the cached SVG elements for the given icon sets for a nested icon element whose "id"
     * tag matches the specified name. If found, copies the nested element to a new SVG element and
     * returns it. Returns null if no matching element is found.
     * @param iconName
     * @param iconSetConfigs
     * @returns SvgElement
     */
    /**
         * Searches the cached SVG elements for the given icon sets for a nested icon element whose "id"
         * tag matches the specified name. If found, copies the nested element to a new SVG element and
         * returns it. Returns null if no matching element is found.
         * @param iconName
         * @param iconSetConfigs
         * @returns SvgElement
         */
    CuiIconRegistry.prototype._extractIconWithNameFromAnySet = /**
         * Searches the cached SVG elements for the given icon sets for a nested icon element whose "id"
         * tag matches the specified name. If found, copies the nested element to a new SVG element and
         * returns it. Returns null if no matching element is found.
         * @param iconName
         * @param iconSetConfigs
         * @returns SvgElement
         */
    function (iconName, iconSetConfigs) {
        // Iterate backwards, so icon sets added later have precedence.
        /* tslint:disable-next-line:no-increment-decrement */
        for (var i = iconSetConfigs.length - 1; i >= 0; i--) {
            var config = iconSetConfigs[i];
            if (config.svgElement) {
                var foundIcon = this._extractSvgIconFromSet(config.svgElement, iconName);
                if (foundIcon) {
                    return foundIcon;
                }
            }
        }
        return null;
    };
    /**
     * Loads the content of the icon URL specified in the SvgIconConfig and creates an SVG element
     * from it.
     * @param config
     * @returns SvgIcon
     */
    /**
         * Loads the content of the icon URL specified in the SvgIconConfig and creates an SVG element
         * from it.
         * @param config
         * @returns SvgIcon
         */
    CuiIconRegistry.prototype._loadSvgIconFromConfig = /**
         * Loads the content of the icon URL specified in the SvgIconConfig and creates an SVG element
         * from it.
         * @param config
         * @returns SvgIcon
         */
    function (config) {
        var _this = this;
        return this._fetchUrl(config.url)
            .pipe(map(function (svgText) { return _this._createSvgElementForSingleIcon(svgText); }));
    };
    /**
     * Loads the content of the icon set URL specified in the
     * SvgIconConfig and creates an SVG element
     * from it.
     * @param config
     * @return SvgIconSet
     */
    /**
         * Loads the content of the icon set URL specified in the
         * SvgIconConfig and creates an SVG element
         * from it.
         * @param config
         * @return SvgIconSet
         */
    CuiIconRegistry.prototype._loadSvgIconSetFromConfig = /**
         * Loads the content of the icon set URL specified in the
         * SvgIconConfig and creates an SVG element
         * from it.
         * @param config
         * @return SvgIconSet
         */
    function (config) {
        var _this = this;
        // TODO: Document that icons should only be loaded from trusted sources.
        return this._fetchUrl(config.url).pipe(map(function (svgText) { return _this._svgElementFromString(svgText); }));
    };
    /**
     * Creates a DOM element from the given SVG string, and adds default attributes.
     * @param responseText
     * @returns SvgElement
     */
    /**
         * Creates a DOM element from the given SVG string, and adds default attributes.
         * @param responseText
         * @returns SvgElement
         */
    CuiIconRegistry.prototype._createSvgElementForSingleIcon = /**
         * Creates a DOM element from the given SVG string, and adds default attributes.
         * @param responseText
         * @returns SvgElement
         */
    function (responseText) {
        var svg = this._svgElementFromString(responseText);
        this._setSvgAttributes(svg);
        return svg;
    };
    /**
     * Searches the cached element of the given SvgIconConfig for a nested icon element whose "id"
     * tag matches the specified name. If found, copies the nested element to a new SVG element and
     * returns it. Returns null if no matching element is found.
     * @param iconSet
     * @param iconName
     * @returns SvgIcon
     */
    /**
         * Searches the cached element of the given SvgIconConfig for a nested icon element whose "id"
         * tag matches the specified name. If found, copies the nested element to a new SVG element and
         * returns it. Returns null if no matching element is found.
         * @param iconSet
         * @param iconName
         * @returns SvgIcon
         */
    CuiIconRegistry.prototype._extractSvgIconFromSet = /**
         * Searches the cached element of the given SvgIconConfig for a nested icon element whose "id"
         * tag matches the specified name. If found, copies the nested element to a new SVG element and
         * returns it. Returns null if no matching element is found.
         * @param iconSet
         * @param iconName
         * @returns SvgIcon
         */
    function (iconSet, iconName) {
        var iconNode = iconSet.querySelector("#" + iconName);
        if (!iconNode) {
            return null;
        }
        // If the icon node is itself an <svg> node, clone and return it directly. If not, set it as
        // the content of a new <svg> node.
        if (iconNode.tagName.toLowerCase() === 'svg') {
            return this._setSvgAttributes(iconNode.cloneNode(true));
        }
        // If the node is a <symbol>, it won't be rendered so we have to convert it into <svg>. Note
        // that the same could be achieved by referring to
        // it via <use href="#id">, however the <use>
        // tag is problematic on Firefox, because it needs to include the current page path.
        if (iconNode.nodeName.toLowerCase() === 'symbol') {
            return this._setSvgAttributes(this._toSvgElement(iconNode));
        }
        // createElement('SVG') doesn't work as expected; the DOM ends up with
        // the correct nodes, but the SVG content doesn't render. Instead we
        // have to create an empty SVG node using innerHTML and append its content.
        // Elements created using DOMParser.parseFromString have the same problem.
        // http://stackoverflow.com/questions/23003278/svg-innerhtml-in-firefox-can-not-display
        var svg = this._svgElementFromString('<svg></svg>');
        // Clone the node so we don't remove it from the parent icon set element.
        svg.appendChild(iconNode.cloneNode(true));
        return this._setSvgAttributes(svg);
    };
    /**
     * Creates a DOM element from the given SVG string.
     * @param str
     * @returns SVGElement
     */
    /**
         * Creates a DOM element from the given SVG string.
         * @param str
         * @returns SVGElement
         */
    CuiIconRegistry.prototype._svgElementFromString = /**
         * Creates a DOM element from the given SVG string.
         * @param str
         * @returns SVGElement
         */
    function (str) {
        // TODO: Is there a better way than innerHTML? Renderer doesn't appear to have a method for
        // creating an element from an HTML string.
        var div = document.createElement('DIV');
        div.innerHTML = str;
        var svg = div.querySelector('svg');
        if (!svg) {
            throw Error('<svg> tag not found');
        }
        return svg;
    };
    /**
     * Converts an element into an SVG node by cloning all of its children.
     * @param element
     * @returns SVGElement
     */
    /**
         * Converts an element into an SVG node by cloning all of its children.
         * @param element
         * @returns SVGElement
         */
    CuiIconRegistry.prototype._toSvgElement = /**
         * Converts an element into an SVG node by cloning all of its children.
         * @param element
         * @returns SVGElement
         */
    function (element) {
        var svg = this._svgElementFromString('<svg></svg>');
        /* tslint:disable-next-line:no-increment-decrement */
        for (var i = 0; i < element.childNodes.length; i++) {
            if (element.childNodes[i].nodeType === Node.ELEMENT_NODE) {
                svg.appendChild(element.childNodes[i].cloneNode(true));
            }
        }
        return svg;
    };
    /**
     * Sets the default attributes for an SVG element to be used as an icon.
     * @param svg
     * @returns SVGElement
     */
    /**
         * Sets the default attributes for an SVG element to be used as an icon.
         * @param svg
         * @returns SVGElement
         */
    CuiIconRegistry.prototype._setSvgAttributes = /**
         * Sets the default attributes for an SVG element to be used as an icon.
         * @param svg
         * @returns SVGElement
         */
    function (svg) {
        if (!svg.getAttribute('xmlns')) {
            svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        }
        svg.setAttribute('fit', '');
        svg.setAttribute('height', '100%');
        svg.setAttribute('width', '100%');
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        // Disable IE11 default behavior to make SVGs focusable.
        svg.setAttribute('focusable', 'false');
        return svg;
    };
    /**
     * Returns an Observable which produces the string contents of the given URL. Results may be
     * cached, so future calls with the same URL may not cause another HTTP request.
     * @param safeUrl
     * @returns url
     */
    /**
         * Returns an Observable which produces the string contents of the given URL. Results may be
         * cached, so future calls with the same URL may not cause another HTTP request.
         * @param safeUrl
         * @returns url
         */
    CuiIconRegistry.prototype._fetchUrl = /**
         * Returns an Observable which produces the string contents of the given URL. Results may be
         * cached, so future calls with the same URL may not cause another HTTP request.
         * @param safeUrl
         * @returns url
         */
    function (safeUrl) {
        var _this = this;
        if (!this._httpClient) {
            throw getMatIconNoHttpProviderError();
        }
        var url = this._sanitizer.sanitize(SecurityContext.RESOURCE_URL, safeUrl);
        if (!url) {
            throw getMatIconFailedToSanitizeError(safeUrl);
        }
        // Store in-progress fetches to avoid sending a duplicate request for a URL when there is
        // already a request in progress for that URL. It's necessary to call share() on the
        // Observable returned by http.get() so that multiple subscribers don't cause multiple XHRs.
        var inProgressFetch = this._inProgressUrlFetches.get(url);
        if (inProgressFetch) {
            return inProgressFetch;
        }
        // TODO(jelbourn): for some reason, the `finally` operator "loses" the generic type on the
        // Observable. Figure out why and fix it.
        var req = this._httpClient.get(url, { responseType: 'text' }).pipe(finalize(function () { return _this._inProgressUrlFetches.delete(url); }), share());
        this._inProgressUrlFetches.set(url, req);
        return req;
    };
    CuiIconRegistry.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    CuiIconRegistry.ctorParameters = function () { return [
        { type: HttpClient, decorators: [{ type: Optional },] },
        { type: DomSanitizer, },
    ]; };
    return CuiIconRegistry;
}());
export { CuiIconRegistry };
export function ICON_REGISTRY_PROVIDER_FACTORY(parentRegistry, httpClient, sanitizer) {
    return parentRegistry || new CuiIconRegistry(httpClient, sanitizer);
}
export var ICON_REGISTRY_PROVIDER = {
    // If there is already an MdIconRegistry available, use that. Otherwise, provide a new one.
    provide: CuiIconRegistry,
    deps: [
        [new Optional(), new SkipSelf(), CuiIconRegistry],
        [new Optional(), HttpClient],
        DomSanitizer,
    ],
    useFactory: ICON_REGISTRY_PROVIDER_FACTORY,
};
/* Clones an SVGElement while preserving type information. */
function cloneSvg(svg) {
    return svg.cloneNode(true);
}
/**
 * Returns the cache key to use for an icon namespace and name.
 * @param namespace
 * @param name
 * @returns iconKey
 */
function iconKey(namespace, name) {
    return namespace + ":" + name;
}
//# sourceMappingURL=icon-registry.js.map