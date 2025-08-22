import { FormLayout } from "@ui/form";
import { ServiceIntroduce } from "@dashboard/service-introdice";

export default async function AuthLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <FormLayout size="w-7xl">
      <div 
      className="basis-1/2 hidden sm:block"
        // className="basis-1/2 hidden sm:block self-stretch rounded-3xl overflow-hidden"
        // style={{
        //   flex: '1 0 0',
        //   background: 'url(/rectangle.jpg) lightgray 50% / cover no-repeat',
        //   borderRadius: '1.5rem' // 24px, same as rounded-3xl
        // }}
      >
        <ServiceIntroduce />
      </div>
      <div className="basis-full sm:basis-1/2 flex flex-col items-center justify-center relative">
      {/* <div className="basis-full sm:basis-1/2 flex flex-col items-center justify-center"> */}
        {children}
      </div>
    </FormLayout>
  );
}
