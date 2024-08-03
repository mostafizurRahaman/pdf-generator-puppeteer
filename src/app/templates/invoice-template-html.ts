const InvoiceHtmlTemplate = (data: Record<string, unknown>) => {
  console.log(data);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MRF Tech BD</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <h1>Welcome to MRF Tech BD</h1>
    <nav>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section id="home">
      <h2>Home</h2>
      <p>Welcome to MRF Tech BD. We provide quality tech solutions for your needs.</p>
    </section>

    <section id="about">
      <h2>About Us</h2>
      <p>MRF Tech BD is a leading technology company offering a wide range of services.</p>
    </section>

    <section id="services">
      <h2>Our Services</h2>
      <p>We offer web development, app development, and IT consulting services.</p>
    </section>

    <section id="contact">
      <h2>Contact Us</h2>
      <p>Feel free to <a href="mailto:info@mrftechbd.com">contact us</a> for more information.</p>
    </section>
  </main>

  <footer>
    <p>&copy; 2024 <a href="https://www.mrftechbd.com">www.mrftechbd.com</a></p>
  </footer>
</body>
</html>
`;
};

export default InvoiceHtmlTemplate;
