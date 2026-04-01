import React from 'react'

function App() {
  return (
    <div className="min-h-screen bg-bg-main text-white flex flex-col">
      {/* React Router will map layout components here in Task 8 */}
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center p-8 border-4 border-black shadow-brutal rounded-brutal bg-surface mx-4">
          <h1 className="font-heading text-4xl text-primary uppercase tracking-tighter">
            CampusVault
          </h1>
          <p className="font-sans font-bold text-neutral-gray mt-2 text-sm">
            Blank Canvas Initialized.
          </p>
        </div>
      </main>
    </div>
  )
}

export default App
