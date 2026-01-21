import { UploadCloud, Brain, Sparkles } from 'lucide-react';
import { Card } from '../common/card';
import { SectionTitle } from '../common/sectionTitle';

interface FeatureItemProps{
    icon: any;
    title: string;
    description: string;
} 
export const FeatureItem = ({ icon: Icon, title, description }: FeatureItemProps) => (
    <Card className="flex flex-col items-center text-center p-4">
        <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-4">
            <Icon className="w-8 h-8 text-orange-600 dark:text-orange-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </Card>
);

export default function HowItWorkSection() {
    return(
         <section id="how-it-works" className="py-16 md:py-24">
        <SectionTitle align='center'>How It Works in 3 Simple Steps</SectionTitle>
        <p className="text-center text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-12">
            Our powerful engine handles the heavy lifting, from file processing to sophisticated multi-model summarization.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureItem 
                icon={UploadCloud} 
                title="1. Securely Upload"
                description="Drag and drop your PDF using UploadThing's secure, fast service. We handle files of any size."
            />
            <FeatureItem 
                icon={Brain} 
                title="2. AI Intelligence"
                description="Our system chunks the text, applies a Map-Reduce strategy, and uses the Gemini API for precise summarization."
            />
            <FeatureItem 
                icon={Sparkles} 
                title="3. Gain Instant Insight"
                description="Review the full summary, save it to your dashboard, and share the key findings with your team."
            />
        </div>
    </section>
    );
}