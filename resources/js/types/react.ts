export interface ReactChildren {
    children: React.ReactNode;
}

export interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export type Order = {
    id: number;
    name: string;
    address: string;
    quantity: number;
    type: 'refill' | 'new_purchase' | 'pickup_return';
    status: 'on_process' | 'on_delivery';
};

export interface OrdersModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Order) => void;
    initialData?: Order;
}

export type Service = {
    id: number;
    name: string;
    price_per_gallon: number;
    image: string;
};

export interface ServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { name: string; price_per_gallon: number; image: string }) => void;
    initialData?: { name: string; price_per_gallon: number; image: string };
    isEdit?: boolean;
}

export type GalleryImage = {
    id: number;
    image: string;
    caption: string;
};

export interface GalleryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: { image: string; caption: string }) => void;
}

export interface Testimonial {
    id: number;
    name: string;
    message: string;
    location: string;
}

export interface TestimonialModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { name: string; message: string }) => void;
    initialData?: Testimonial;
    isEdit?: boolean;
}
