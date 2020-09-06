// spec.js
describe('Protractor Test Front-End', function() {

  var pageName = element(by.id('pageName'));

  it('enter to the page', function() {
    browser.get('https://turismoaragon.herokuapp.com/');

    expect(pageName.getText()).toEqual('¡Bienvenido!');
  });

  it('navigate to Registry page and come back', function() {
    element(by.id('buttonRegistry')).click();

    expect(pageName.getText()).toEqual('Regístrate en Descubre Aragón');

    element(by.id('buttonVolver')).click();

    expect(pageName.getText()).toEqual('¡Bienvenido!');
  });

  it('login', function() {
    element(by.id('email')).sendKeys('go@g.g');
    element(by.id('password')).sendKeys('12345678');

    element(by.id('login')).click();

    expect(pageName.getText()).toEqual('Inicio');
  });

  it('navigate to Perfil and Cambiar contraseña', function() {
    element(by.id('buttonPerfil')).click();

    expect(pageName.getText()).toEqual('Perfil');

    element(by.id('buttonCambiarContrasena')).click();

    expect(pageName.getText()).toEqual('Cambiar Contraseña');
  });

  it('navigate to Conversaciones', function() {
    element(by.id('buttonConversaciones')).click();

    expect(pageName.getText()).toEqual('Conversaciones');
  });

  it('navigate to Estadisticas', function() {
    element(by.id('buttonEstadisticas')).click();

    expect(pageName.getText()).toEqual('Estadísticas');
  });

  it('logout', function() {
    element(by.id('buttonSalir')).click();

    expect(pageName.getText()).toEqual('¡Bienvenido!');
  });

  it('login admin', function() {
    element(by.id('email')).sendKeys('descubrearagonstw@gmail.com');
    element(by.id('password')).sendKeys('STW-1920');

    element(by.id('login')).click();

    expect(pageName.getText()).toEqual('Inicio');
  });

  it('navigate to Estadisticas', function() {
    element(by.id('buttonEstadisticas')).click();

    expect(pageName.getText()).toEqual('Estadísticas');
  });

  it('navigate to Datos', function() {
    element(by.id('buttonDatos')).click();

    expect(pageName.getText()).toEqual('Actualizar datos');
  });

  it('logout', function() {
    element(by.id('buttonSalir')).click();

    expect(pageName.getText()).toEqual('¡Bienvenido!');
  });

});