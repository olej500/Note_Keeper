function Footer(){
    const year = new Date().getFullYear();

    return(
        <footer>
            <p>Copyright © Olej {year}</p>
        </footer>
    );
}

export default Footer;