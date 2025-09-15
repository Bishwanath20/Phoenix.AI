
import React from 'react';
import { CodeBracketIcon } from './icons';

const CodeView: React.FC = () => {
    const codeSnippet = `
// Code for the current canvas will be displayed here.
// Example: React component for the landing page.

function LandingPage() {
  return (
    <div className="main-container">
      <h1>Simplify your workflow.</h1>
      <p>“Projects without the chaos. Teamwork without the headache. Productivity without the burnout.”</p>
      We debug so you don't have to — common, <button> Try us</button>
    </div>
  );
}

export default LandingPage;
    `;

    return (
        <div className="p-4 text-gray-500 dark:text-canvas-text-secondary h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4 text-gray-900 dark:text-canvas-text-primary">
                <CodeBracketIcon className="w-5 h-5" />
                <h3 className="font-semibold">Generated Code</h3>
            </div>
            <div className="bg-gray-100 dark:bg-canvas-dark rounded-md p-4 flex-1 overflow-auto">
                <pre className="text-sm">
                    <code className="language-javascript">
                        {codeSnippet.trim()}
                    </code>
                </pre>
            </div>
        </div>
    );
};

export default CodeView;