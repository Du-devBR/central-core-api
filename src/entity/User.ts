export interface UserProps {
  id: string;
  name: string;
  lastname: string;
  email: string;
  github: string;
  cretatedAt: Date;
  modifiedAt?: Date;
  // role        Role
}

export class User {
  private id: string;
  private name: string;
  private lastname: string;
  private email: string;
  private github: string;
  private cretatedAt: Date;
  private modifiedAt: Date | undefined;

  constructor({
    id,
    name,
    lastname,
    email,
    github,
    cretatedAt,
    modifiedAt,
  }: UserProps) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.github = github;
    this.cretatedAt = cretatedAt;
    this.modifiedAt = modifiedAt;
  }
}
