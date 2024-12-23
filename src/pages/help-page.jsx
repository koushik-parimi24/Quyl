import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"

function  Help() {
    const faqs = [
        { question: "How do I reset my password?", answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page and following the instructions sent to your email." },
        { question: "How can I track my progress?", answer: "You can view your progress on the Dashboard page, which shows your completed chapters and overall course progress." },
        { question: "Can I access the course content offline?", answer: "Currently, our platform requires an internet connection to access course materials. We're working on an offline mode for future updates." },
        // Add more FAQs as needed
      ];
    return ( 
        <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Help Center</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Contact Support</h2>
        <Card>
          <CardHeader>
            <CardTitle>Need More Help?</CardTitle>
            <CardDescription>Our support team is here to assist you.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Email: support@example.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Hours: Monday - Friday, 9am - 5pm EST</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <a href="mailto:support@example.com">Contact Support</a>
            </Button>
          </CardFooter>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Helpful Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>User Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Comprehensive guide on how to use our platform effectively.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild>
                View Guide
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Video Tutorials</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Step-by-step video tutorials for common tasks and features.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild>
                Watch Tutorials
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
     );
}

export default Help;