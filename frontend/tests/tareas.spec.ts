import { test, expect } from '@playwright/test';

test.describe('Tareas App E2E', () => {
  
  test('Admin Flow: Login and View Users', async ({ page }) => {
    await page.goto('/login');
    
    // Login as Admin
    await page.getByLabel('Email').fill('admin@test.com');
    await page.getByLabel('Password').fill('123456');
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Should be redirected to /admin
    await expect(page).toHaveURL(/.*admin/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Panel de Administración');
    
    // Verify user list is visible (at least John Doe should be there)
    await expect(page.getByRole('table')).toContainText('John Doe');
  });

  test('User Flow: Login and Create Task', async ({ page }) => {
    await page.goto('/login');
    
    // Login as User
    await page.getByLabel('Email').fill('john@test.com');
    await page.getByLabel('Password').fill('123456');
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Should be redirected to /dashboard
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Mis Tareas');
    
    // Create a new task
    await page.getByRole('button', { name: 'Nueva Tarea' }).click();
    await page.getByLabel('Título').fill('Tarea de Prueba E2E');
    await page.getByLabel('Descripción').fill('Esta es una tarea creada por Playwright');
    await page.getByRole('button', { name: 'Guardar' }).click();
    
    // Verify task appeared
    await expect(page.getByText('Tarea de Prueba E2E')).toBeVisible();
  });

});
