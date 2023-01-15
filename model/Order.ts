export default class Order {
  constructor(
    public OrderID: number = 0,
    public ProductIndex: number = 0,
    public Quantity: number = 0,
    public UnitPrice: number = 0,
    public Discount: number = 0,
    public createdAt: string = new Date().toISOString()
  ) {}
}
