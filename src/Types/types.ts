export interface Diamond {
    lot_id: number;
    color: string;
    shape: string;
    clarity: string;
    cut: string;
    polish: string;
    symmetry: string;
    fluorescence: string;
    lab: string;
    location: string;
    carats: number;
    price_per_carat: number;
    certificate_number: number;
  }

  export interface AxiosError {
    response?: {
      status: number;
      data?:any
    };
    request?: any;
    message?: string;
  }