export interface ICreateAds {
    name: string;
    img:string;
    type: AdType;
    id?:string;
}

export enum AdType {
    A = 'A',
    B = 'B',
  }