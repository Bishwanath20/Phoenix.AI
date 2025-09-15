
type Theme = 'light' | 'dark';

const componentTemplates: { [key: string]: string } = {
  Flexbox: `
    <div class="p-6 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
      <h2 class="text-xl font-bold mb-4 text-slate-900 dark:text-slate-100">Flexbox Layout</h2>
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1 p-4 bg-slate-200 dark:bg-slate-700 rounded">Item 1</div>
        <div class="flex-1 p-4 bg-slate-200 dark:bg-slate-700 rounded">Item 2</div>
        <div class="flex-1 p-4 bg-slate-200 dark:bg-slate-700 rounded">Item 3</div>
      </div>
    </div>`,
  Sidebar: `
    <div class="flex h-64 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div class="w-1/4 bg-slate-200 dark:bg-slate-700 p-4">
            <h3 class="font-bold text-slate-900 dark:text-slate-100">Sidebar</h3>
            <ul class="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <li><a href="#" class="hover:underline">Link 1</a></li>
                <li><a href="#" class="hover:underline">Link 2</a></li>
                <li><a href="#" class="hover:underline">Link 3</a></li>
            </ul>
        </div>
        <div class="flex-1 p-4">
            <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100">Main Content</h2>
            <p class="mt-2 text-slate-600 dark:text-slate-300">This is the main content area next to the sidebar.</p>
        </div>
    </div>`,
  LoginForm: `
    <div class="p-6 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
        <h2 class="text-xl font-bold mb-4 text-slate-900 dark:text-slate-100">Login Form</h2>
        <form class="space-y-4">
            <div>
                <label for="email" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                <input type="email" id="email" class="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            </div>
            <div>
                <label for="password" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                <input type="password" id="password" class="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">Sign In</button>
        </form>
    </div>`,
  ContactForm: `
    <div class="p-6 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
        <h2 class="text-xl font-bold mb-4 text-slate-900 dark:text-slate-100">Contact Us</h2>
        <form class="space-y-4">
            <div>
                <label for="name" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                <input type="text" id="name" class="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm">
            </div>
            <div>
                <label for="message" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
                <textarea id="message" rows="4" class="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm"></textarea>
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">Send Message</button>
        </form>
    </div>`,
  FileUpload: `
    <div class="p-6 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
        <h2 class="text-xl font-bold mb-4 text-slate-900 dark:text-slate-100">File Upload</h2>
        <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 dark:border-slate-600 border-dashed rounded-md">
            <div class="space-y-1 text-center">
                <svg class="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                <div class="flex text-sm text-slate-600 dark:text-slate-400">
                    <label for="file-upload" class="relative cursor-pointer bg-white dark:bg-slate-800 rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" class="sr-only">
                    </label>
                    <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs text-slate-500 dark:text-slate-500">PNG, JPG, GIF up to 10MB</p>
            </div>
        </div>
    </div>`,
};

export const generateHtml = (componentTypes: string[], theme: Theme): string => {
    const bodyContent = componentTypes
        .map(type => componentTemplates[type] || `<div class="p-4 border rounded bg-red-100 text-red-800">Error: Component template for "${type}" not found.</div>`)
        .join('\n');

    return `
<!DOCTYPE html>
<html lang="en" class="${theme}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Deployed Project</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        darkMode: 'class',
      }
    </script>
</head>
<body class="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans">
    <div class="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        <header>
            <h1 class="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">My Deployed Project</h1>
            <p class="mt-2 text-lg text-slate-600 dark:text-slate-400">Generated by Phoenix.AI</p>
        </header>
        <main class="space-y-6">
            ${bodyContent || '<p class="text-center text-slate-500">No components were added to the canvas.</p>'}
        </main>
    </div>
</body>
</html>
    `;
};
