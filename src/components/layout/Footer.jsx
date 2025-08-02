//placeholder file for Footer component

export const Footer = () => {
  return (
    <footer className='border-t bg-white dark:bg-zinc-900 mt-8'>
      <div className='max-w-5xl mx-auto px-4 py-4 text-sm text-muted-foreground text-center'>
        &copy; {new Date().getFullYear()} Chingu Voyage 56 - Team 01
      </div>
    </footer>
  );
};
