type DataType =
  | 'string'
  | 'number'
  | 'integer'
  | 'boolean'
  | 'object'
  | 'array'
  | string[];

interface SchemaBase {
  name?: string;
  type: DataType;
  format?: string;
  description?: string;
  enum?: any[];
  minimum?: number;
  maximum?: number;
  minItems?: number;
  maxItems?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  required?: Array<string>;
  additionalProperties?: boolean | SchemaItem;
}

interface SchemaObject extends SchemaBase {
  type: 'object';
  properties?: {
    [key: string]: SchemaItem;
  };
  required?: Array<string>;
}

interface SchemaArray extends SchemaBase {
  type: 'array';
  items?: SchemaItem;
}

interface SchemaHeaders extends SchemaBase {
  type: 'object';
  properties?: {
    [key: string]: SchemaItem;
  };
  required?: Array<string>;
}

type SchemaItem = SchemaBase | SchemaObject | SchemaArray;

export interface Schema {
  schema?: {
    tags?: string[];
    headers?: SchemaItem;
    query?: SchemaItem;
    params?: SchemaItem;
    body?: SchemaItem;
    response?: {
      [key: number]: SchemaItem;
    };
  };
  handler?: any;
  onRequest?: any;
  preHandler?: any;
}
