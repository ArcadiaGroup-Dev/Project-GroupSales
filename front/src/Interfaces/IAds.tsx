export interface ICreateAds {
    name: string;
    img:string;
    type: AdType;
}

export enum AdType {
    A = 'A',
    B = 'B',
  }