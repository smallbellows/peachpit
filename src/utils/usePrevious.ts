import { useEffect, useRef, MutableRefObject } from 'react';

export function usePrevious<Type>(value: Type): Type | undefined {
    const ref: MutableRefObject<Type | undefined> = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}
