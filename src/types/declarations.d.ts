declare module 'qrcode' {
  export interface QRCodeToStringOptions {
    type?: 'svg' | 'utf8';
    margin?: number;
    color?: {
      dark?: string;
      light?: string;
    };
  }

  export interface QRCodeToBufferOptions {
    type?: 'png';
    margin?: number;
    scale?: number;
    color?: {
      dark?: string;
      light?: string;
    };
  }

  export function toString(text: string, options?: QRCodeToStringOptions): Promise<string>;
  export function toBuffer(text: string, options?: QRCodeToBufferOptions): Promise<Buffer>;
}

