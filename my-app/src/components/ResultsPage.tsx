import {
  AlertTriangle,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Download,
  FileText,
  Folder,
  Scale,
  Share2,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface ResultsPageProps {
  onBack: () => void;
}

interface CounterArgument {
  id: string;
  title: string;
  strength: "High" | "Medium" | "Low";
  keyPoints: string[];
  detailedAnalysis: string;
  legalPrecedents: string[];
  recommendations: string[];
}

const mockCounterArguments: CounterArgument[] = [
  {
    id: "1",
    title: "Lack of Proximate Causation",
    strength: "High",
    keyPoints: [
      "No direct evidence linking defendant's actions to plaintiff's damages",
      "Multiple intervening factors could have contributed to the outcome",
      "Temporal gap between alleged negligence and actual harm",
    ],
    detailedAnalysis:
      "The plaintiff's case fails to establish a clear causal link between the defendant's alleged breach and the damages claimed. The evidence presented shows several independent variables that could have contributed to or caused the plaintiff's injuries. The timing of events suggests that intervening circumstances may have been the primary factor in the outcome, thereby breaking the chain of causation necessary for liability.",
    legalPrecedents: [
      "Palsgraf v. Long Island Railroad Co. (1928) - Proximate cause requirements",
      "Mitchell v. Gonzales (1991) - Intervening causation analysis",
      "Doe v. American National Red Cross (1996) - Burden of proof for causation",
    ],
    recommendations: [
      "Request detailed medical records to identify alternative causes",
      "Engage expert witnesses to testify on intervening factors",
      "File motion to dismiss based on insufficient causal evidence",
    ],
  },
  {
    id: "2",
    title: "Contributory Negligence Defense",
    strength: "High",
    keyPoints: [
      "Plaintiff failed to exercise reasonable care for their own safety",
      "Evidence suggests plaintiff was aware of potential risks",
      "Plaintiff's actions directly contributed to the incident",
    ],
    detailedAnalysis:
      "The evidence strongly suggests that the plaintiff's own negligent behavior was a substantial contributing factor to the incident. Documentation shows the plaintiff was provided with safety warnings and proper instructions but chose to disregard them. Under comparative negligence principles, the plaintiff's damages should be reduced proportionally to their degree of fault, which appears to be significant in this case.",
    legalPrecedents: [
      "Butterfield v. Forrester (1809) - Contributory negligence foundation",
      "Li v. Yellow Cab Co. (1975) - Comparative negligence standard",
      "McIntyre v. Balentine (1992) - Modified comparative fault",
    ],
    recommendations: [
      "Gather evidence of plaintiff's knowledge of safety protocols",
      "Obtain witness statements regarding plaintiff's behavior",
      "Calculate proportional fault allocation for damages reduction",
    ],
  },
  {
    id: "3",
    title: "Statute of Limitations Expiration",
    strength: "Medium",
    keyPoints: [
      "Claim may have been filed outside the statutory time limit",
      "Discovery rule application is questionable",
      "No valid tolling circumstances present",
    ],
    detailedAnalysis:
      "A careful examination of the timeline reveals that the plaintiff's claim may be barred by the applicable statute of limitations. While the plaintiff argues the discovery rule should apply, the facts suggest they knew or should have known of the injury and its cause well before they claim. There are no circumstances present that would justify tolling the statute, such as fraud, concealment, or plaintiff's incapacity.",
    legalPrecedents: [
      "Wilson v. Garcia (1985) - Statute of limitations application",
      "Klehr v. A.O. Smith Corp. (1997) - Discovery rule standards",
      "Gabelli v. SEC (2013) - Accrual of limitations period",
    ],
    recommendations: [
      "Conduct detailed timeline analysis of when plaintiff gained knowledge",
      "File motion to dismiss based on statute of limitations",
      "Prepare evidence showing plaintiff's early awareness of injury",
    ],
  },
  {
    id: "4",
    title: "Failure to Mitigate Damages",
    strength: "Medium",
    keyPoints: [
      "Plaintiff rejected reasonable alternative treatments or solutions",
      "Unnecessary delay in seeking appropriate remedies",
      "Plaintiff's choices amplified the extent of damages",
    ],
    detailedAnalysis:
      "The duty to mitigate damages is a fundamental principle in tort law, and the plaintiff appears to have violated this duty. Evidence indicates the plaintiff was offered reasonable alternatives to minimize harm but declined them without valid justification. Additionally, the plaintiff delayed seeking treatment or remedy for an unreasonable period, which likely exacerbated the damages now being claimed. This failure to act reasonably should reduce or eliminate certain categories of damages.",
    legalPrecedents: [
      "Parker v. Twentieth Century-Fox (1970) - Duty to mitigate",
      "Rockingham County v. Luten Bridge Co. (1929) - Mitigation requirement",
      "Dictor v. Creative Management Services (1971) - Reasonable efforts standard",
    ],
    recommendations: [
      "Document all rejected settlement offers and alternative remedies",
      "Calculate damages that accrued only due to plaintiff's inaction",
      "Prepare expert testimony on reasonable mitigation steps",
    ],
  },
  {
    id: "5",
    title: "Assumption of Risk Defense",
    strength: "Low",
    keyPoints: [
      "Plaintiff voluntarily participated in activity with known risks",
      "Express or implied waiver may be applicable",
      "Risk was inherent to the activity undertaken",
    ],
    detailedAnalysis:
      "The plaintiff knowingly and voluntarily exposed themselves to a known danger by participating in the activity that led to their injury. Documentation, including signed agreements or circumstantial evidence of the plaintiff's awareness, supports the argument that they assumed the risk. While this defense has limitations and varies by jurisdiction, it could potentially bar recovery or significantly reduce damages if the risk was obvious and inherent to the activity.",
    legalPrecedents: [
      "Murphy v. Steeplechase Amusement Co. (1929) - Assumption of risk",
      "Knight v. Jewett (1992) - Primary vs. secondary assumption",
      "Blackburn v. Dorta (1977) - Merger with comparative negligence",
    ],
    recommendations: [
      "Locate any signed waivers or release agreements",
      "Establish plaintiff's prior experience with similar activities",
      "Demonstrate the inherent nature of the risk involved",
    ],
  },
];

export function ResultsPage({ onBack }: ResultsPageProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case "High":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "Medium":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "Low":
        return "bg-orange-500/10 text-orange-400 border-orange-500/20";
      default:
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Navigation Bar */}
      <nav className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center gap-8">
            <h1 className="flex items-center gap-2 text-zinc-100">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                <Folder className="h-5 w-5 text-white" />
              </div>
              Pressure Lab
            </h1>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 -ml-3 text-zinc-400 hover:text-zinc-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cases
          </Button>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-zinc-100">Counter-Argument Analysis</h2>
                <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                  5 Arguments Identified
                </Badge>
              </div>
              <p className="text-zinc-400">
                Top strategic defenses for Industrial Valve Assessment
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-zinc-800 border-zinc-700 text-zinc-100 hover:bg-zinc-700"
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-zinc-800 border-zinc-700 text-zinc-100 hover:bg-zinc-700"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <Card className="mb-6 bg-blue-500/5 border-blue-500/20 p-4">
          <div className="flex gap-3">
            <AlertTriangle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-blue-100 mb-1">Analysis Complete</p>
              <p className="text-blue-200/70">
                The following counter-arguments have been ranked by strength and
                applicability to the plaintiff's case. Expand each argument to
                view detailed analysis, legal precedents, and strategic
                recommendations.
              </p>
            </div>
          </div>
        </Card>

        {/* Counter Arguments List */}
        <div className="space-y-4">
          {mockCounterArguments.map((argument, index) => (
            <Card
              key={argument.id}
              className="bg-zinc-900 border-zinc-800 overflow-hidden transition-all hover:border-zinc-700"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 flex-shrink-0">
                      <Scale className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-zinc-500">#{index + 1}</span>
                        <h3 className="text-zinc-100">{argument.title}</h3>
                        <Badge className={getStrengthColor(argument.strength)}>
                          {argument.strength} Strength
                        </Badge>
                      </div>

                      {/* Key Points */}
                      <ul className="space-y-2 mt-3">
                        {argument.keyPoints.map((point, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-zinc-400"
                          >
                            <span className="text-blue-400 mt-1">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Expand Button */}
                <Button
                  variant="ghost"
                  onClick={() => toggleExpand(argument.id)}
                  className="w-full mt-4 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
                >
                  {expandedId === argument.id ? (
                    <>
                      <ChevronUp className="mr-2 h-4 w-4" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="mr-2 h-4 w-4" />
                      Show Detailed Analysis
                    </>
                  )}
                </Button>

                {/* Expanded Content */}
                {expandedId === argument.id && (
                  <div className="mt-6 pt-6 border-t border-zinc-800 space-y-6">
                    {/* Detailed Analysis */}
                    <div>
                      <h4 className="text-zinc-200 mb-3 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-blue-400" />
                        Detailed Analysis
                      </h4>
                      <p className="text-zinc-400 leading-relaxed">
                        {argument.detailedAnalysis}
                      </p>
                    </div>

                    {/* Legal Precedents */}
                    <div>
                      <h4 className="text-zinc-200 mb-3 flex items-center gap-2">
                        <Scale className="h-4 w-4 text-blue-400" />
                        Legal Precedents
                      </h4>
                      <ul className="space-y-2">
                        {argument.legalPrecedents.map((precedent, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-zinc-400"
                          >
                            <span className="text-blue-400 mt-1">•</span>
                            <span>{precedent}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Recommendations */}
                    <div>
                      <h4 className="text-zinc-200 mb-3 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-blue-400" />
                        Strategic Recommendations
                      </h4>
                      <ul className="space-y-2">
                        {argument.recommendations.map((rec, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-zinc-400"
                          >
                            <span className="text-blue-400 mt-1">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Action Section */}
        <Card className="mt-8 bg-zinc-900 border-zinc-800 p-6">
          <div className="text-center">
            <h3 className="text-zinc-100 mb-2">Need Further Analysis?</h3>
            <p className="text-zinc-400 mb-4">
              Generate additional counter-arguments or request a detailed legal
              brief
            </p>
            <div className="flex justify-center gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Generate More Arguments
              </Button>
              <Button
                variant="outline"
                className="bg-zinc-800 border-zinc-700 text-zinc-100 hover:bg-zinc-700"
              >
                Request Legal Brief
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
