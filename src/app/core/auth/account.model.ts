export class Account {
  constructor(
    public authorities: string[],
    public email: string,
    public fullName: string,
    public imageUrl: string | null
  ) {}
}
