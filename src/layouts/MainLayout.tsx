const MainLayout = ({children}) => {
    return(
        <div className="text-center">
      <section className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
        {children}
      </section>
    </div>
    );
}

export default MainLayout;