"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Step1 } from "./step1";

export const Step1Wrapper: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const mode = searchParams.get('mode') as 'create' | 'edit' || 'create';
  
  console.log("Step1Wrapper - searchParams:", searchParams.toString());
  console.log("Step1Wrapper - mode from URL:", searchParams.get('mode'));
  console.log("Step1Wrapper - final mode:", mode);
  
  const handleSaveComplete = () => {
    // 回到 Registration Record 頁面
    router.push('/admin/registration-record');
  };

  return (
    <Step1 
      mode={mode} 
      onSaveComplete={mode === 'edit' ? handleSaveComplete : undefined}
    />
  );
};
