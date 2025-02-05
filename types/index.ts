export interface Skill {
    name: string;
    count: number;
    verified: boolean;
}

export interface Task {
    id: number;
    title: string;
    location: string;
    duration: string;
    description: string;
    reputation: number;
    hourlyRate: number;
    provider: string;
}

export interface WalletState {
    address: string | null;
    balance: string | null;
} 