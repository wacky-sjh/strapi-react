const PageLayout = ({ children }: { children: React.ReactNode }) => (
  <main className="pt-20 w-screen min-h-screen flex flex-col items-center justify-start">
    {children}
  </main>
);
export default PageLayout;
