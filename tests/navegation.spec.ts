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