'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _mapValues = require('lodash/mapValues');

var _mapValues2 = _interopRequireDefault(_mapValues);

var _utils = require('./utils');

var _constants = require('./constants.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This class is used to build and make queries to the database
 * and operating the resulting set (such as updating attributes
 * or deleting the records).
 *
 * The queries are built lazily. For example:
 *
 * ```javascript
 * const qs = Book.all()
 *     .filter(book => book.releaseYear > 1999)
 *     .orderBy('name');
 * ```
 *
 * Doesn't execute a query. The query is executed only when
 * you need information from the query result, such as {@link QuerySet#count},
 * {@link QuerySet#toRefArray}. After the query is executed, the resulting
 * set is cached in the QuerySet instance.
 *
 * QuerySet instances also return copies, so chaining filters doesn't
 * mutate the previous instances.
 */
var QuerySet = function () {
    /**
     * Creates a QuerySet. The constructor is mainly for internal use;
     * You should access QuerySet instances from {@link Model}.
     *
     * @param  {Model} modelClass - the model class of objects in this QuerySet.
     * @param  {any[]} clauses - query clauses needed to evaluate the set.
     * @param {Object} [opts] - additional options
     */
    function QuerySet(modelClass, clauses, opts) {
        (0, _classCallCheck3.default)(this, QuerySet);

        (0, _assign2.default)(this, {
            modelClass: modelClass,
            clauses: clauses || []
        });

        this._opts = opts;
    }

    (0, _createClass3.default)(QuerySet, [{
        key: '_new',
        value: function _new(clauses, userOpts) {
            var opts = (0, _assign2.default)({}, this._opts, userOpts);
            return new this.constructor(this.modelClass, clauses, opts);
        }
    }, {
        key: 'toString',
        value: function toString() {
            var _this = this;

            this._evaluate();
            var contents = this.rows.map(function (id) {
                return _this.modelClass.withId(id).toString();
            }).join('\n    - ');
            return 'QuerySet contents: \n    - ' + contents;
        }

        /**
         * Returns an array of the plain objects represented by the QuerySet.
         * The plain objects are direct references to the store.
         *
         * @return {Object[]} references to the plain JS objects represented by
         *                    the QuerySet
         */

    }, {
        key: 'toRefArray',
        value: function toRefArray() {
            this._evaluate();
            return this.rows;
        }

        /**
         * Returns an array of {@link Model} instances represented by the QuerySet.
         * @return {Model[]} model instances represented by the QuerySet
         */

    }, {
        key: 'toModelArray',
        value: function toModelArray() {
            this._evaluate();
            var ModelClass = this.modelClass;
            return this.rows.map(function (props) {
                return new ModelClass(props);
            });
        }

        /**
         * Returns the number of {@link Model} instances represented by the QuerySet.
         *
         * @return {number} length of the QuerySet
         */

    }, {
        key: 'count',
        value: function count() {
            this._evaluate();
            return this.rows.length;
        }

        /**
         * Checks if the {@link QuerySet} instance has any records matching the query
         * in the database.
         *
         * @return {Boolean} `true` if the {@link QuerySet} instance contains entities, else `false`.
         */

    }, {
        key: 'exists',
        value: function exists() {
            return Boolean(this.count());
        }

        /**
         * Returns the {@link Model} instance at index `index` in the {@link QuerySet} instance if
         * `withRefs` flag is set to `false`, or a reference to the plain JavaScript
         * object in the model state if `true`.
         *
         * @param  {number} index - index of the model instance to get
         * @return {Model|Object} a {@link Model} instance or a plain JavaScript
         *                        object at index `index` in the {@link QuerySet} instance
         */

    }, {
        key: 'at',
        value: function at(index) {
            this._evaluate();
            var ModelClass = this.modelClass;
            return new ModelClass(this.rows[index]);
        }

        /**
         * Returns the {@link Model} instance at index 0 in the {@link QuerySet} instance.
         * @return {Model}
         */

    }, {
        key: 'first',
        value: function first() {
            return this.at(0);
        }

        /**
         * Returns the {@link Model} instance at index `QuerySet.count() - 1`
         * @return {Model}
         */

    }, {
        key: 'last',
        value: function last() {
            this._evaluate();
            return this.at(this.rows.length - 1);
        }

        /**
         * Returns a new {@link QuerySet} instance with the same entities.
         * @return {QuerySet} a new QuerySet with the same entities.
         */

    }, {
        key: 'all',
        value: function all() {
            return this._new(this.clauses);
        }

        /**
         * Returns a new {@link QuerySet} instance with entities that match properties in `lookupObj`.
         *
         * @param  {Object} lookupObj - the properties to match objects with.
         * @return {QuerySet} a new {@link QuerySet} instance with objects that passed the filter.
         */

    }, {
        key: 'filter',
        value: function filter(lookupObj) {
            var normalizedLookupObj = (typeof lookupObj === 'undefined' ? 'undefined' : (0, _typeof3.default)(lookupObj)) === 'object' ? (0, _mapValues2.default)(lookupObj, _utils.normalizeEntity) : lookupObj;
            var filterDescriptor = { type: _constants.FILTER, payload: normalizedLookupObj };
            return this._new(this.clauses.concat(filterDescriptor));
        }

        /**
         * Returns a new {@link QuerySet} instance with entities that do not match
         * properties in `lookupObj`.
         *
         * @param  {Object} lookupObj - the properties to unmatch objects with.
         * @return {QuerySet} a new {@link QuerySet} instance with objects that passed the filter.
         */

    }, {
        key: 'exclude',
        value: function exclude(lookupObj) {
            var normalizedLookupObj = (typeof lookupObj === 'undefined' ? 'undefined' : (0, _typeof3.default)(lookupObj)) === 'object' ? (0, _mapValues2.default)(lookupObj, _utils.normalizeEntity) : lookupObj;
            var excludeDescriptor = { type: _constants.EXCLUDE, payload: normalizedLookupObj };
            return this._new(this.clauses.concat(excludeDescriptor));
        }
    }, {
        key: '_evaluate',
        value: function _evaluate() {
            if (!this._evaluated) {
                var session = this.modelClass.session;
                var querySpec = {
                    table: this.modelClass.modelName,
                    clauses: this.clauses
                };

                var _session$query = session.query(querySpec),
                    rows = _session$query.rows;

                this.rows = rows;
                this._evaluated = true;
            }
        }

        /**
         * Returns a new {@link QuerySet} instance with entities ordered by `iteratees` in ascending
         * order, unless otherwise specified. Delegates to `lodash.orderBy`.
         *
         * @param  {string[]|Function[]} iteratees - an array where each item can be a string or a
         *                                           function. If a string is supplied, it should
         *                                           correspond to property on the entity that will
         *                                           determine the order. If a function is supplied,
         *                                           it should return the value to order by.
         * @param {Boolean[]} [orders] - the sort orders of `iteratees`. If unspecified, all iteratees
         *                               will be sorted in ascending order. `true` and `'asc'`
         *                               correspond to ascending order, and `false` and `'desc`
         *                               to descending order.
         * @return {QuerySet} a new {@link QuerySet} with objects ordered by `iteratees`.
         */

    }, {
        key: 'orderBy',
        value: function orderBy(iteratees, orders) {
            var orderByDescriptor = { type: _constants.ORDER_BY, payload: [iteratees, orders] };
            return this._new(this.clauses.concat(orderByDescriptor));
        }

        /**
         * Records an update specified with `mergeObj` to all the objects
         * in the {@link QuerySet} instance.
         *
         * @param  {Object} mergeObj - an object to merge with all the objects in this
         *                             queryset.
         * @return {undefined}
         */

    }, {
        key: 'update',
        value: function update(mergeObj) {
            this.modelClass.session.applyUpdate({
                action: _constants.UPDATE,
                query: {
                    table: this.modelClass.modelName,
                    clauses: this.clauses
                },
                payload: mergeObj
            });
            this._evaluated = false;
        }

        /**
         * Records a deletion of all the objects in this {@link QuerySet} instance.
         * @return {undefined}
         */

    }, {
        key: 'delete',
        value: function _delete() {
            this.toModelArray().forEach(function (model) {
                return model._onDelete();
            });

            this.modelClass.session.applyUpdate({
                action: _constants.DELETE,
                query: {
                    table: this.modelClass.modelName,
                    clauses: this.clauses
                }
            });

            this._evaluated = false;
        }

        // DEPRECATED AND REMOVED METHODS

    }, {
        key: 'map',
        value: function map() {
            throw new Error('QuerySet.prototype.map is removed. ' + 'Call .toModelArray() or .toRefArray() first to map.');
        }
    }, {
        key: 'forEach',
        value: function forEach() {
            throw new Error('QuerySet.prototype.forEach is removed. ' + 'Call .toModelArray() or .toRefArray() first to iterate.');
        }
    }, {
        key: 'withModels',
        get: function get() {
            throw new Error('QuerySet.prototype.withModels is removed. ' + 'Use .toModelArray() or predicate functions that ' + 'instantiate Models from refs, e.g. new Model(ref).');
        }
    }, {
        key: 'withRefs',
        get: function get() {
            (0, _utils.warnDeprecated)('QuerySet.prototype.withRefs is deprecated. ' + 'Query building operates on refs only now.');
        }
    }], [{
        key: 'addSharedMethod',
        value: function addSharedMethod(methodName) {
            this.sharedMethods = this.sharedMethods.concat(methodName);
        }
    }]);
    return QuerySet;
}();

QuerySet.sharedMethods = ['count', 'at', 'all', 'last', 'first', 'exists', 'filter', 'exclude', 'orderBy', 'update', 'delete'];

exports.default = QuerySet;