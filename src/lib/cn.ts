export function cn(cls: string, ...additional: string[]): string {
    return [cls, additional].join(' ');
}
