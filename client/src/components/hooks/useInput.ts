import { useState } from "react";

export function useInput<T>(initialValue: T) {
   const [value, setValue] = useState<T>(initialValue);

   const onChange = (e: any) => {
      setValue(e.target.value)
   }

   return { value, onChange }
}