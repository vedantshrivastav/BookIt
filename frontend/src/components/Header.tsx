import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/Logo";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
}

const Header = ({ searchQuery, onSearchChange, onSearch }: HeaderProps) => {
  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Logo />

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-2">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search experiences"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                className="w-full bg-muted border-0 pl-4 pr-4 py-5 text-base"
              />
            </div>
          </div>

          {/* Search Button */}
          <Button variant="default" size="lg" className="flex-shrink-0" onClick={onSearch}>
            Search
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
