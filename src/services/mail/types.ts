export type BodyParams = object | string | number;

export interface IMail {
  from: string;
  to: string;
  subject: string;
  params: BodyParams;
  setParams: (params: BodyParams) => void;
  getBody: () => string;
  setTo: (email: string) => void;
}

export abstract class Mail implements IMail {
  from: string = 'test@email.com';

  subject: string;

  to: string;

  constructor(to: string) {
    this.to = to;
  }

  abstract params: BodyParams;

  abstract setParams(params: BodyParams): void;

  abstract getBody(): string;

  setTo(email: string): void {
    this.to = email;
  }
}
