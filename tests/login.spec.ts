import {expect, test} from '@playwright/test'

test('login to hrm', async({page}) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/')
    await page.getByRole('textbox', {name: 'username'}).fill('Admin')
    await page.getByRole('textbox', {name: 'Password'}).fill('admin123')
    await page.getByRole('button', {name: 'login'}).click()

    await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible()

})

test('login fail to hrm', async({page}) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/')
    await page.getByRole('textbox', {name: 'username'}).fill('Admin')
    await page.getByRole('textbox', {name: 'Password'}).fill('admin1234')
    await page.getByRole('button', {name: 'login'}).click()

    await expect(page.getByRole('alert'))
    .toHaveText(/Invalid credentials/);

})