type HeaderProps1 = {
  title: string;
  subtitle?: string; // Optional
};

function Header({ title, subtitle }: HeaderProps1) {
    return (
        <header>
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
        </header>
    );
}

export default Header;