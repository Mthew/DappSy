export class Transaction {
  id;
  projectId;
  sellerId;
  buyerId;
  tokenCount;
  created = new Date().toISOString();
  toJson = () => ({
    id: this.id,
    projectId: this.projectId,
    sellerId: this.sellerId,
    buyerId: this.buyerId,
    tokenCount: this.tokenCount,
    created: this.created,
  });
}
