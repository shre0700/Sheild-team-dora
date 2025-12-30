import React from 'react';

const SidebarNav: React.FC = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <aside className="w-64 min-h-screen bg-card border-r border-border px-6 py-8 fixed left-0 top-0">
      <h2 className="text-xl font-bold mb-8">Gig Worker Portal</h2>

      <nav className="space-y-4">
        <button
          onClick={() => scrollTo('verified')}
          className="w-full text-left px-4 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90"
        >
          Get Verified
        </button>

        <button
          onClick={() => scrollTo('certified')}
          className="w-full text-left px-4 py-3 rounded-xl bg-secondary text-secondary-foreground font-medium hover:opacity-90"
        >
          Get Certified
        </button>

        <button
          onClick={() => scrollTo('learn')}
          className="w-full text-left px-4 py-3 rounded-xl border border-border hover:bg-muted"
        >
          Learn More
        </button>
      </nav>
    </aside>
  );
};

export default SidebarNav;
