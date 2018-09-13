Web app for making appointments at medical center. Apart from styling and minor functional differences project was essentially about cloning another company's similar system [https://ajanvaraus.mehilainen.fi](https://ajanvaraus.mehilainen.fi/?language=en)

git clone https://github.com/vikaservices/webreservation.git
cd webreservation
npm install
export ENV=development; gulp build-run

Access app at localhost:8080
(Really doesn't do much though, because pretty much all actions require backend,
which is not available)
