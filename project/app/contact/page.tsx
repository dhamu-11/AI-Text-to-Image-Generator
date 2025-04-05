import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Your Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 rounded-md border dark:bg-gray-800"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Message</label>
          <Textarea className="w-full h-32" placeholder="Your message..." />
        </div>
        <Button type="submit">Send Message</Button>
      </form>
    </div>
  );
}
