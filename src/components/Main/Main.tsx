const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="main" id="content">
      {children}
    </main>
  );
};

export default Main;
