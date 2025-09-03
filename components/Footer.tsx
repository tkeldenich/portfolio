export default function Footer() {
  return (
    <footer className="border-t bg-background py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          <p className="text-sm text-muted-foreground">
            © Copyright {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
