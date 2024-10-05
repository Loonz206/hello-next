type MainProps = {
  children: React.ReactNode;
};

const Main = ({ children }: MainProps) => {
  return (
    <main className="main" id="content">
      {children}
    </main>
  );
};

export default Main;
