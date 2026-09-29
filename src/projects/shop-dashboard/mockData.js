/**
 * Sample data for the Mini Shop Dashboard.
 * Everything here is made up for the demo. It does not describe a real shop,
 * real customers or real sales.
 */

export const CATEGORIES = ['Electronics', 'Accessories', 'Stationery', 'Home']

export const sampleProducts = [
  { id: 'p1', name: 'Wireless Mouse', sku: 'EL-1001', category: 'Electronics', price: 14.99, stock: 42, description: 'Compact 2.4 GHz wireless mouse with a silent click.' },
  { id: 'p2', name: 'Mechanical Keyboard', sku: 'EL-1002', category: 'Electronics', price: 49, stock: 8, description: 'Tenkeyless keyboard with tactile switches.' },
  { id: 'p3', name: 'USB-C Hub (6-in-1)', sku: 'EL-1003', category: 'Electronics', price: 24.5, stock: 0, description: 'HDMI, USB-A, SD card and USB-C charging ports.' },
  { id: 'p4', name: 'Laptop Stand', sku: 'AC-2001', category: 'Accessories', price: 19.9, stock: 23, description: 'Adjustable aluminium stand for laptops up to 16".' },
  { id: 'p5', name: 'Canvas Backpack', sku: 'AC-2002', category: 'Accessories', price: 29, stock: 5, description: 'Water-resistant backpack with a padded laptop sleeve.' },
  { id: 'p6', name: 'Phone Case', sku: 'AC-2003', category: 'Accessories', price: 7.5, stock: 64, description: 'Slim protective case with raised edges.' },
  { id: 'p7', name: 'A5 Dotted Notebook', sku: 'ST-3001', category: 'Stationery', price: 4.2, stock: 120, description: '160 pages of dotted paper, lay-flat binding.' },
  { id: 'p8', name: 'Gel Pens (10 pack)', sku: 'ST-3002', category: 'Stationery', price: 3.8, stock: 86, description: 'Assorted colours, 0.5 mm tip.' },
  { id: 'p9', name: 'Desk Organizer', sku: 'ST-3003', category: 'Stationery', price: 11, stock: 3, description: 'Five compartments for pens, notes and cables.' },
  { id: 'p10', name: 'Ceramic Coffee Mug', sku: 'HM-4001', category: 'Home', price: 6.9, stock: 37, description: '350 ml mug, dishwasher safe.' },
  { id: 'p11', name: 'LED Desk Lamp', sku: 'HM-4002', category: 'Home', price: 21, stock: 12, description: 'Dimmable lamp with three colour temperatures.' },
  { id: 'p12', name: 'Insulated Water Bottle', sku: 'HM-4003', category: 'Home', price: 12.5, stock: 0, description: 'Keeps drinks cold for up to 24 hours.' },
]

/**
 * Orders use `daysAgo` instead of fixed dates so the "last 7 days" chart
 * always shows recent sample data.
 */
export const sampleOrders = [
  { id: '#1024', customer: 'Dara S.', daysAgo: 0, status: 'Processing', items: [{ productId: 'p1', qty: 2 }, { productId: 'p7', qty: 3 }] },
  { id: '#1023', customer: 'Sokha P.', daysAgo: 0, status: 'Completed', items: [{ productId: 'p2', qty: 1 }] },
  { id: '#1022', customer: 'Vanna K.', daysAgo: 0, status: 'Completed', items: [{ productId: 'p10', qty: 2 }, { productId: 'p8', qty: 1 }] },
  { id: '#1021', customer: 'Bopha T.', daysAgo: 1, status: 'Completed', items: [{ productId: 'p4', qty: 1 }, { productId: 'p6', qty: 2 }] },
  { id: '#1020', customer: 'Rithy M.', daysAgo: 1, status: 'Cancelled', items: [{ productId: 'p5', qty: 1 }] },
  { id: '#1019', customer: 'Chanthy N.', daysAgo: 1, status: 'Completed', items: [{ productId: 'p11', qty: 1 }, { productId: 'p7', qty: 2 }] },
  { id: '#1018', customer: 'Piseth R.', daysAgo: 2, status: 'Completed', items: [{ productId: 'p1', qty: 1 }, { productId: 'p3', qty: 1 }] },
  { id: '#1017', customer: 'Srey Leak H.', daysAgo: 2, status: 'Completed', items: [{ productId: 'p9', qty: 2 }] },
  { id: '#1016', customer: 'Visal C.', daysAgo: 3, status: 'Completed', items: [{ productId: 'p2', qty: 1 }, { productId: 'p4', qty: 1 }] },
  { id: '#1015', customer: 'Dara S.', daysAgo: 3, status: 'Completed', items: [{ productId: 'p12', qty: 2 }, { productId: 'p10', qty: 1 }] },
  { id: '#1014', customer: 'Monika L.', daysAgo: 3, status: 'Completed', items: [{ productId: 'p8', qty: 4 }, { productId: 'p7', qty: 2 }] },
  { id: '#1013', customer: 'Kosal V.', daysAgo: 4, status: 'Completed', items: [{ productId: 'p6', qty: 1 }] },
  { id: '#1012', customer: 'Sokha P.', daysAgo: 4, status: 'Completed', items: [{ productId: 'p5', qty: 1 }, { productId: 'p1', qty: 1 }] },
  { id: '#1011', customer: 'Nita Y.', daysAgo: 5, status: 'Completed', items: [{ productId: 'p11', qty: 2 }] },
  { id: '#1010', customer: 'Vanna K.', daysAgo: 5, status: 'Cancelled', items: [{ productId: 'p3', qty: 1 }] },
  { id: '#1009', customer: 'Rithy M.', daysAgo: 5, status: 'Completed', items: [{ productId: 'p2', qty: 1 }, { productId: 'p9', qty: 1 }] },
  { id: '#1008', customer: 'Bopha T.', daysAgo: 6, status: 'Completed', items: [{ productId: 'p4', qty: 1 }, { productId: 'p10', qty: 2 }] },
  { id: '#1007', customer: 'Chanthy N.', daysAgo: 6, status: 'Completed', items: [{ productId: 'p7', qty: 5 }] },
]
