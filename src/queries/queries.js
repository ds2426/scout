import { gql } from "apollo-boost";
// PRODUCT
export const PRODUCTS = gql`
query {
  Product {
    id
    sku
    product_name
    product_description
  }
}
`;

export const SUBMIT_PRODUCT = gql`
mutation($name: String!, $description: String!) {
  insert_Product(objects: { 
      product_name: $name,
      product_description: $description
}) {
    affected_rows
  }
}
`;

export const DELETE_PRODUCT = gql`
mutation($id: Int!) {
  delete_Product(
    where: { id: { _eq: $id }  }
    ) {
    affected_rows
  }
}
`;

export const UPDATE_PRODUCT = gql`
mutation($id: Int!,$newName: String!) {
  update_Product(
    where: { id: { _eq: $id } },
    _set: { product_name: $newName }) {
    affected_rows
  }
}
`;

export const UPDATE_PRODUCT_DESCRIPTION = gql`
mutation($id: Int!,$description: String!) {
  update_Product(
    where: { id: { _eq: $id } },
    _set: { product_description: $description }) {
    affected_rows
  }
}
`;

// Bins
export const BINS = gql`
query {
  Bin {
    id
    bin_id
    bin_name
  }
}
`;

export const SUBMIT_BIN = gql`
mutation($name: String!) {
  insert_Bin(objects: { 
      bin_name: $name
}) {
    affected_rows
  }
}
`;

export const DELETE_BIN = gql`
mutation($id: Int!) {
  delete_Bin(
    where: { id: { _eq: $id }  }
    ) {
    affected_rows
  }
}
`;

export const UPDATE_BIN = gql`
mutation($id: Int!,$newName: String!) {
  update_Bin(
    where: { id: { _eq: $id } },
    _set: { bin_name: $newName }) {
    affected_rows
  }
}
`;

// Bins
export const INVENTORYS = gql`
query {
  Inventory {
    id
    product_id
    bin_id
    qty
    name
  }
}
`;

export const SUBMIT_INVENTORY = gql`
mutation($productId: Int, $binId: Int, $quantity: Int, $name: String) {
  insert_Inventory(objects: { 
      product_id: $productId,
      bin_id: $binId,
      qty: $quantity,
      name: $name
}) {
    affected_rows
  }
}
`;

export const DELETE_INVENTORY = gql`
mutation($id: Int!) {
  delete_Inventory(
    where: { id: { _eq: $id }  }
    ) {
    affected_rows
  }
}
`;

export const UPDATE_INVENTORY = gql`
mutation($id: Int!, $newName: String) {
  update_Inventory(
    where: { id: { _eq: $id } },
    _set: { name: $newName }) {
    affected_rows
  }
}
`;

export const UPDATE_INVENTORY_QUANTITY = gql`
mutation($id: Int!, $quantity: Int) {
  update_Inventory(
    where: { id: { _eq: $id } },
    _set: { qty: $quantity }) {
    affected_rows
  }
}
`;

// Orders
export const ORDERS = gql`
query {
  Order {
    id
    order_number
    date_ordered
    customer_name
    customer_address
  }
}
`;
export const SUBMIT_ORDER = gql`
mutation($name: String, $address: String, $date: date) {
  insert_Order(objects: { 
      date_ordered: $date,
      customer_name: $name,
      customer_address: $address
}) {
    affected_rows
  }
}
`;

export const DELETE_ORDER = gql`
mutation($id: Int!) {
  delete_Order(
    where: { id: { _eq: $id }  }
    ) {
    affected_rows
  }
}
`;

// OrderLines
export const ORDERLINES = gql`
query {
  OrderLine {
    id
    order_id
    product_id
    qty
  }
}
`;
export const SUBMIT_ORDERLINE = gql`
mutation($productId: Int, $order: Int, $quantity: Int) {
  insert_OrderLine(objects: { 
    order_id: $order,
    product_id: $productId,
    qty: $quantity
}) {
    affected_rows
  }
}
`;

export const DELETE_ORDERLINE = gql`
mutation($id: Int!) {
  delete_OrderLine(
    where: { id: { _eq: $id }  }
    ) {
    affected_rows
  }
}
`;



