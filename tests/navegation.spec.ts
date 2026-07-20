import {test, expect} from '@playwright/test'

test('Check left menu option', async({page}) =>{

    // Ir a la aplicación
    await page.goto('https://opensource-demo.orangehrmlive.com/')

    // Iniciar sesión
    await page.getByRole('textbox', {name: 'username'}).fill('Admin')
    await page.getByRole('textbox', {name: 'Password'}).fill('admin123')
    await page.getByRole('button', {name: 'login'}).click()

    // Verificar que el menú lateral esté visible
    await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible()

    // Validar los elementos del menu

    const leftMenuItems = page.getByLabel('Sidepanel').getByRole('listitem')
    const currentMenuItemnsCount =  await leftMenuItems.count()
    console.log('Current menu itemns count', currentMenuItemnsCount)

    const currentMenuItemns: string[] = []

    for(let i=0; i<currentMenuItemnsCount; i++){

        const menuText = await leftMenuItems.nth(i).innerText()
        currentMenuItemns.push(menuText)
    }

    console.log(currentMenuItemns)
    const expectedMenuItems = [
        'Admin',
        'PIM',
        'Leave',
        'Time',
        'Recruitment',
        'My Info',
        'Performance',
        'Dashboard',
        'Directory',
        'Maintenance',
        'Claim',
        'Buzz'
    ];
    
    expect(currentMenuItemns).toEqual(expectedMenuItems)

})

test('Check first left menu option is Admin', async ({ page }) => {

    // Ir a la aplicación
    await page.goto('https://opensource-demo.orangehrmlive.com/');

    // Iniciar sesión
    await page.getByRole('textbox', { name: 'username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'login' }).click();

    // Verificar que el menú lateral esté visible
    const leftMenuItems = page.getByLabel('Sidepanel').getByRole('listitem');

    // Validar que el primer elemento del menú sea "Admin"
    await expect(leftMenuItems.first()).toHaveText('Admin');

});

test('Navigate through the left panel', async({page}) =>{

    // Ir a la aplicación
    await page.goto('https://opensource-demo.orangehrmlive.com/')

    // Iniciar sesión
    await page.getByRole('textbox', {name: 'username'}).fill('Admin')
    await page.getByRole('textbox', {name: 'Password'}).fill('admin123')
    await page.getByRole('button', {name: 'login'}).click()

    // Verificar que el menú lateral esté visible
    await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible()

    // Validar los elementos del menu

    const leftMenuItems = page.getByLabel('Sidepanel').getByRole('listitem')
    const currentMenuItemnsCount =  await leftMenuItems.count()

    for(let i = 0; i<currentMenuItemnsCount; i++){

        const menuItem = leftMenuItems.nth(i)
        const menuText = await menuItem.innerText()

        console.log('Current menu item', menuText)

        if(menuText !== 'Maintenance'){
        await menuItem.click()}

    }
})

test('Navigate through the left panel goBack', async ({ page }) => {

    test.setTimeout(120000);
    // Ir a la aplicación
    await page.goto('https://opensource-demo.orangehrmlive.com/');

    // Login
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByLabel('Sidepanel')).toBeVisible();

    // Contar las opciones del menú una sola vez
    const menuCount = await page
        .getByLabel('Sidepanel')
        .getByRole('listitem')
        .count();

    for (let i = 0; i < menuCount; i++) {

        // Volver a obtener el locator en cada vuelta
        const menuItem = page
            .getByLabel('Sidepanel')
            .getByRole('listitem')
            .nth(i);

        const menuText = await menuItem.innerText();

        console.log(`Menú ${i + 1}: ${menuText}`);

        await menuItem.click();

        // Esperar a que cargue la opción
           await page.waitForLoadState('networkidle');

        if (menuText === 'Maintenance') {

            // Regresar
            await page.goBack();

            // Esperar a que vuelva el menú
            await expect(page.getByLabel('Sidepanel')).toBeVisible();
        }
    }
})