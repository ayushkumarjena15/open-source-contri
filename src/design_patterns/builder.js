/**
 * Builder Design Pattern
 * Fluent interface for constructing complex query or configuration objects step-by-step.
 */

class QueryBuilder {
  constructor(collection = '') {
    this._collection = collection;
    this._fields = [];
    this._conditions = [];
    this._orderBys = [];
    this._limitVal = null;
    this._offsetVal = null;
    this._joins = [];
  }

  /**
   * Set target table or collection
   * @param {string} collection 
   * @returns {QueryBuilder}
   */
  from(collection) {
    this._collection = collection;
    return this;
  }

  /**
   * Select specific fields
   * @param {...string} fields 
   * @returns {QueryBuilder}
   */
  select(...fields) {
    this._fields.push(...fields);
    return this;
  }

  /**
   * Add where condition
   * @param {string} field 
   * @param {string} operator 
   * @param {*} value 
   * @returns {QueryBuilder}
   */
  where(field, operator, value) {
    if (value === undefined) {
      // Shorthand where(field, value) -> where(field, '=', value)
      this._conditions.push({ field, operator: '=', value: operator });
    } else {
      this._conditions.push({ field, operator, value });
    }
    return this;
  }

  /**
   * Add ordering
   * @param {string} field 
   * @param {'ASC'|'DESC'} [direction='ASC'] 
   * @returns {QueryBuilder}
   */
  orderBy(field, direction = 'ASC') {
    this._orderBys.push({ field, direction: direction.toUpperCase() });
    return this;
  }

  /**
   * Set max records to return
   * @param {number} limit 
   * @returns {QueryBuilder}
   */
  limit(limit) {
    this._limitVal = limit;
    return this;
  }

  /**
   * Set records offset for pagination
   * @param {number} offset 
   * @returns {QueryBuilder}
   */
  offset(offset) {
    this._offsetVal = offset;
    return this;
  }

  /**
   * Builds and returns immutable structured query AST object
   * @returns {Object}
   */
  build() {
    if (!this._collection) {
      throw new Error('Query must specify a target collection/table using .from()');
    }

    return Object.freeze({
      collection: this._collection,
      fields: this._fields.length > 0 ? [...this._fields] : ['*'],
      conditions: [...this._conditions],
      orderBys: [...this._orderBys],
      limit: this._limitVal,
      offset: this._offsetVal
    });
  }

  /**
   * Formats into pseudo-SQL query string
   * @returns {string}
   */
  toSQL() {
    const query = this.build();
    let sql = `SELECT ${query.fields.join(', ')} FROM ${query.collection}`;

    if (query.conditions.length > 0) {
      const conds = query.conditions.map(c => `${c.field} ${c.operator} ${typeof c.value === 'string' ? `'${c.value}'` : c.value}`);
      sql += ` WHERE ${conds.join(' AND ')}`;
    }

    if (query.orderBys.length > 0) {
      const orders = query.orderBys.map(o => `${o.field} ${o.direction}`);
      sql += ` ORDER BY ${orders.join(', ')}`;
    }

    if (query.limit !== null) {
      sql += ` LIMIT ${query.limit}`;
    }

    if (query.offset !== null) {
      sql += ` OFFSET ${query.offset}`;
    }

    return sql;
  }
}

module.exports = QueryBuilder;
