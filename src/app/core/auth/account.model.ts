export class Account {
  constructor(
    public authorities: string[],
    public email: string,
    public fullName: string | null,
    public imageUrl: string | null
  ) {}
}
