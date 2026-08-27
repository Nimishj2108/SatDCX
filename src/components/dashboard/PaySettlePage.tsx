import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Send, 
  QrCode, 
  Zap, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  RefreshCw, 
  ShieldCheck, 
  Cpu, 
  Flame, 
  Coins, 
  Volume2, 
  Camera, 
  Info, 
  Scale, 
  Plane, 
  Layers, 
  AlertCircle,
  Building2
} from 'lucide-react';
import { useLiveRates } from '../../services/livePriceService';
import { SAMPLE_PRICE_GOUGE_ITEMS, LIGHTNING_TRAVEL_NODES } from '../../data/mockData';
import { PriceGougeAssessment, UserProfile } from '../../types';

interface PaySettlePageProps {
  user?: UserProfile;
}

export const PaySettlePage: React.FC<PaySettlePageProps> = ({ user }) => {
  const isForeigner = user?.nationality === 'foreign' || user?.nationality === 'foreigner';
  const liveRates = useLiveRates();

  const [activeSendMode, setActiveSendMode] = useState<'dosra_wallet' | 'upi_merchant' | 'camera_scanner'>('camera_scanner');
  
  // Send form inputs
  const [recipientHandleOrAddress, setRecipientHandleOrAddress] = useState('sharmastore@okhdfcbank');
  const [sendAmountInr, setSendAmountInr] = useState<number>(200);
  const marketRate = liveRates.btcInr || 8552190;
  
  // Selected route option
  const [selectedRoute, setSelectedRoute] = useState<'channel_a' | 'channel_b' | 'channel_c'>('channel_a');
  const [isSimulatingPayment, setIsSimulatingPayment] = useState(false);
  const [paymentSuccessData, setPaymentSuccessData] = useState<{
    txId: string;
    preimage: string;
    routeUsed: string;
    settlementTime: string;
    amountInr: number;
    amountSats: number;
    dustSweptSats?: number;
  } | null>(null);

  // Block Hash Simulation State
  const [isMiningHash, setIsMiningHash] = useState(false);
  const [minedBlockData, setMinedBlockData] = useState<{
    blockNumber: number;
    nonce: number;
    prevHash: string;
    merkleRoot: string;
    blockHash: string;
    status: 'Valid Nonce Found' | 'Target Difficulty Met';
  } | null>(null);

  // Soundbox audio simulation state
  const [soundboxPlaying, setSoundboxPlaying] = useState(false);

  // ==========================================
  // TOURIST MRP FAIR PRICE & GOUGE DETECTOR (FOR FOREIGNERS ONLY)
  // ==========================================
  const [selectedGougeItem, setSelectedGougeItem] = useState<PriceGougeAssessment>(SAMPLE_PRICE_GOUGE_ITEMS[0]);
  const [customItemName, setCustomItemName] = useState('Parle-G Biscuit Pack (80g)');
  const [customQuotedPrice, setCustomQuotedPrice] = useState<number>(200);
  const [customStatutoryMrp, setCustomStatutoryMrp] = useState<number>(10);
  const [customLocationType, setCustomLocationType] = useState<
    'Roadside Stall' | 'Tourist Attraction Kiosk' | 'Casual Cafe' | '5-Star Luxury Hotel' | 'Airport Lounge'
  >('Tourist Attraction Kiosk');
  const [customIsPackaged, setCustomIsPackaged] = useState<boolean>(true);
  const [isEvaluatingPrice, setIsEvaluatingPrice] = useState(false);

  // Dynamic Camera Scanner State
  const [scannedMerchantName, setScannedMerchantName] = useState('Chai Point & Snacks (Old Delhi Kiosk)');

  // Bitcoin Dust & Dustbin Optimization
  const [autoSweepDustToDustbin, setAutoSweepDustToDustbin] = useState<boolean>(true);
  const [dustbinBalanceSats, setDustbinBalanceSats] = useState<number>(4850);

  // End Trip Restoration State (FOR FOREIGNERS ONLY)
  const [isEndingTrip, setIsEndingTrip] = useState(false);
  const [endTripReceipt, setEndTripReceipt] = useState<{
    restoredBtc: number;
    restoredSats: number;
    restoredInrValue: number;
    targetWalletAddress: string;
    dustEliminatedSats: number;
    finalBlockReceipt: string;
  } | null>(null);

  const sendAmountSats = Math.round((sendAmountInr / marketRate) * 100000000);
  const dustRiskThresholdSats = 546;
  const changeSatsGenerated = (sendAmountSats % 1000);
  const isDustCreated = changeSatsGenerated > 0 && changeSatsGenerated < dustRiskThresholdSats;

  // Real-time AI Evaluation Algorithm for Price Fairness & Viability (Tourist mode only)
  const calculatePriceFairness = (
    quoted: number,
    statutoryMrp: number,
    location: string,
    isPackaged: boolean
  ): PriceGougeAssessment => {
    let score = 10;
    let verdict: PriceGougeAssessment['verdict'] = 'Fair Statutory MRP (10/10)';
    let explanation = '';
    const questioning: string[] = [];

    const ratio = quoted / Math.max(1, statutoryMrp);

    if (isPackaged) {
      if (ratio === 1) {
        score = 10;
        verdict = 'Fair Statutory MRP (10/10)';
        explanation = `Packaged item sold at exact statutory printed MRP of ₹${statutoryMrp}. 100% compliant with Indian Legal Metrology Rules 2011.`;
        questioning.push('Printed MRP verified on packaging seal.');
        questioning.push('No cooling or tourism surcharges applied.');
      } else if (ratio > 1 && ratio <= 1.5) {
        score = 8;
        verdict = 'Reasonable Minor Markup (7-8/10)';
        explanation = `Slight ₹${quoted - statutoryMrp} convenience or refrigeration surcharge. Common in remote tourist viewpoints or chilled beverage kiosks.`;
        questioning.push('Is the beverage cold / chilled? (A ₹5-₹10 cooling fee is customary in tourist zones)');
      } else if (ratio > 1.5 && ratio <= 3) {
        score = 5;
        verdict = 'Moderate Tourist Premium (5-6/10)';
        explanation = `Price is ${ratio.toFixed(1)}x above statutory MRP. Overcharging above printed MRP is technically illegal in India for packaged commodities without special restaurant service.`;
        questioning.push(`Check packaging back: MRP should read ₹${statutoryMrp}.`);
        questioning.push('Consider buying from an authorized Mother Dairy or Amul kiosk nearby.');
      } else {
        score = Math.max(1, Math.round(10 / ratio));
        verdict = 'Severe Tourist Gouge Detected (1-3/10)';
        explanation = `ALERT: The shopkeeper is quoting ₹${quoted} for an item legally priced at ₹${statutoryMrp} (${ratio.toFixed(1)}x mark-up). This is predatory foreigner tourist gouging.`;
        questioning.push(`Legal violation: Packaged items must NOT be sold above printed MRP (₹${statutoryMrp}).`);
        questioning.push(`Counter-offer: "Bhaiya, MRP toh ₹${statutoryMrp} hai" or politely refuse.`);
      }
    } else {
      if (location === '5-Star Luxury Hotel' || location === 'Airport Lounge') {
        score = 9;
        verdict = 'Elevated Luxury Ambiance (8-9/10)';
        explanation = `In a 5-star hotel or airport lounge, ₹${quoted} reflects premium hospitality, air-conditioned dining, luxury ambiance, and service hygiene.`;
        questioning.push('Verified fine-dining / high-end hospitality environment.');
        questioning.push('Price is consistent with Indian 5-star hotel hospitality standards.');
      } else if (location === 'Roadside Stall') {
        if (ratio <= 1.2) {
          score = 10;
          verdict = 'Fair Statutory MRP (10/10)';
          explanation = `₹${quoted} is authentic, highly affordable street benchmark pricing.`;
          questioning.push('Freshly cooked street meal / hot tea: High value & authentic pricing.');
        } else if (ratio <= 2.5) {
          score = 7;
          verdict = 'Reasonable Minor Markup (7-8/10)';
          explanation = `Slight tourist area mark-up (e.g. ₹30 for a ₹15 chai). Acceptable for tourist convenience.`;
          questioning.push('Common tourist spot markup. Reasonable if quick and convenient.');
        } else {
          score = 2;
          verdict = 'Severe Tourist Gouge Detected (1-3/10)';
          explanation = `Unpackaged roadside stall charging ₹${quoted} (standard local price is ₹${statutoryMrp}). High markup without seating or table service.`;
          questioning.push(`Standard roadside benchmark is ₹${statutoryMrp}.`);
          questioning.push('Ask for the local menu board or agree on price prior to ordering.');
        }
      } else {
        score = Math.min(10, Math.max(3, Math.round(10 / ratio)));
        verdict = score >= 7 ? 'Reasonable Minor Markup (7-8/10)' : 'Moderate Tourist Premium (5-6/10)';
        explanation = `Standard cafe pricing for unpackaged food in city centers.`;
        questioning.push('Check if tax / service charge is included in the bill.');
      }
    }

    return {
      itemName: customItemName,
      category: isPackaged ? 'Packaged FMCG' : 'Street Food & Snacks',
      quotedPriceInr: quoted,
      statutoryMrpInr: statutoryMrp,
      locationType: location as any,
      isPackaged: isPackaged,
      fairnessScore: score,
      verdict: verdict,
      explanation: explanation,
      aiQuestioning: questioning,
      dustRiskSats: Math.round((quoted / marketRate) * 100000000) % 546,
    };
  };

  const handleEvaluateCustomPrice = () => {
    setIsEvaluatingPrice(true);
    setTimeout(() => {
      setIsEvaluatingPrice(false);
      const assessed = calculatePriceFairness(
        customQuotedPrice,
        customStatutoryMrp,
        customLocationType,
        customIsPackaged
      );
      setSelectedGougeItem(assessed);
      setSendAmountInr(customQuotedPrice);
    }, 400);
  };

  const handleSelectPresetGouge = (item: PriceGougeAssessment) => {
    setSelectedGougeItem(item);
    setCustomItemName(item.itemName);
    setCustomQuotedPrice(item.quotedPriceInr);
    setCustomStatutoryMrp(item.statutoryMrpInr);
    setCustomLocationType(item.locationType);
    setCustomIsPackaged(item.isPackaged);
    setSendAmountInr(item.quotedPriceInr);
  };

  const handleExecutePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSimulatingPayment(true);
    setPaymentSuccessData(null);

    setTimeout(() => {
      setIsSimulatingPayment(false);
      const sweptDust = autoSweepDustToDustbin && isDustCreated ? changeSatsGenerated : 0;
      if (sweptDust > 0) {
        setDustbinBalanceSats((prev) => prev + sweptDust);
      }

      const data = {
        txId: 'sat_settle_' + Math.random().toString(36).substring(2, 11),
        preimage: '8f9e7d6c5b4a3210' + Math.random().toString(36).substring(2, 10),
        routeUsed:
          selectedRoute === 'channel_a'
            ? 'Channel A (Direct Peer Mesh, 0.4s)'
            : selectedRoute === 'channel_b'
            ? 'Channel B (Multi-Hop Lightning, 1.1s)'
            : 'Channel C (On-Chain SegWit)',
        settlementTime: selectedRoute === 'channel_a' ? '0.42 seconds' : '1.14 seconds',
        amountInr: sendAmountInr,
        amountSats: sendAmountSats,
        dustSweptSats: sweptDust,
      };
      setPaymentSuccessData(data);

      // Trigger Soundbox notification
      setSoundboxPlaying(true);
      setTimeout(() => setSoundboxPlaying(false), 4000);
    }, 1100);
  };

  const handleEndTripAndRestoreBtc = () => {
    setIsEndingTrip(true);
    setTimeout(() => {
      setIsEndingTrip(false);
      const remainingInr = 18450;
      const restoredSats = Math.round((remainingInr / marketRate) * 100000000);
      const restoredBtc = remainingInr / marketRate;
      
      setEndTripReceipt({
        restoredBtc: restoredBtc,
        restoredSats: restoredSats,
        restoredInrValue: remainingInr,
        targetWalletAddress: 'bc1qtravelerorigin...99x',
        dustEliminatedSats: 0,
        finalBlockReceipt: '00000000000000000003a89f...block_896430',
      });
    }, 1500);
  };

  const handleRunBlockHashSimulation = () => {
    setIsMiningHash(true);
    setMinedBlockData(null);

    setTimeout(() => {
      setIsMiningHash(false);
      setMinedBlockData({
        blockNumber: 896424,
        nonce: Math.floor(1000000 + Math.random() * 9000000),
        prevHash: '000000000000000000027a8f9c1b3e4d5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0',
        merkleRoot: '4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b',
        blockHash: '00000000000000000001a9f88c7b6d5e4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9',
        status: 'Target Difficulty Met',
      });
    }, 900);
  };

  return (
    <div className="space-y-6">
      {/* ========================================================================= */}
      {/* TOP HEADER: DISTINCT FOR INDIAN RESIDENT vs FOREIGN TOURIST */}
      {/* ========================================================================= */}
      {isForeigner ? (
        /* FOREIGN TOURIST HEADER */
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-mono font-bold mb-2 border border-blue-200">
              <Zap className="w-3.5 h-3.5 text-orange-500" />
              <span>🌐 FOREIGN TRAVELER TERMINAL &bull; INSTANT BTC-TO-UPI IN INDIA</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Universal Pay &amp; Tourist Fair-Price AI Firewall
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Scan any Indian merchant UPI QR code. Convert Bitcoin satoshis to INR <em>transaction-by-transaction</em>. Our AI detects tourist overcharging and avoids UTXO dust on every hop.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              id="btn-end-trip-restore"
              onClick={handleEndTripAndRestoreBtc}
              disabled={isEndingTrip}
              className="px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer border border-slate-700"
            >
              {isEndingTrip ? (
                <RefreshCw className="w-4 h-4 animate-spin text-orange-400" />
              ) : (
                <Plane className="w-4 h-4 text-orange-400" />
              )}
              <span>End India Trip &amp; Restore BTC</span>
            </button>

            <div className="p-3 bg-orange-50 border border-orange-200 rounded-2xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-orange-500/20">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-orange-700 uppercase font-bold">
                  100% Sovereign Holding
                </div>
                <div className="text-xs font-bold font-mono text-slate-900">
                  1 BTC = ₹{(marketRate / 100000).toFixed(2)} Lakh
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* INDIAN RESIDENT / BUSINESS HEADER */
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-mono font-bold mb-2 border border-emerald-200">
              <Zap className="w-3.5 h-3.5 text-emerald-600" />
              <span>⚡ LIGHTNING ↔ INDIAN UPI BRIDGE &bull; SUB-SECOND FINALITY</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Universal Pay &amp; Instant UPI Settlement Terminal
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Pay any Indian merchant UPI QR code, phone number, or sovereign handle instantly from your self-custody Bitcoin satoshis with zero counterparty risk.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-orange-500/20">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-500 uppercase font-bold">
                  Live Bitcoin Rate
                </div>
                <div className="text-xs font-bold font-mono text-slate-900">
                  1 BTC = ₹{(marketRate / 100000).toFixed(2)} Lakh
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* END TRIP RESTORATION RECEIPT MODAL (ONLY FOR FOREIGNERS) */}
      {isForeigner && endTripReceipt && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-5 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-blue-950 text-white border border-emerald-500/40 shadow-2xl space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white">
                  Trip Completed &bull; Unspent Funds Restored to Original Bitcoin Cold Wallet
                </h3>
                <p className="text-xs text-emerald-300">
                  Zero foreign exchange loss. Remaining INR converted back to on-chain Satoshis with 0 dust left!
                </p>
              </div>
            </div>
            <button
              onClick={() => setEndTripReceipt(null)}
              className="text-xs text-slate-400 hover:text-white px-2 py-1 bg-white/10 rounded-lg cursor-pointer"
            >
              Dismiss
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/5 p-3.5 rounded-2xl font-mono text-xs border border-white/10">
            <div>
              <span className="text-[10px] text-slate-400 block">RESTORED BITCOIN</span>
              <span className="font-extrabold text-orange-400 text-sm">
                {endTripReceipt.restoredBtc.toFixed(6)} BTC
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">TOTAL SATOSHIS</span>
              <span className="font-bold text-emerald-400 text-sm">
                {endTripReceipt.restoredSats.toLocaleString()} SATS
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">INR VALUE REFUNDED</span>
              <span className="font-bold text-blue-300 text-sm">
                ₹{endTripReceipt.restoredInrValue.toLocaleString('en-IN')}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">DESTINATION ADDRESS</span>
              <span className="font-bold text-slate-300 text-[11px] truncate block">
                {endTripReceipt.targetWalletAddress}
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: AI TOURIST MRP FAIR PRICE & GOUGE DETECTOR (FOREIGNERS ONLY) */}
      {/* ========================================================================= */}
      {isForeigner && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                  AI Tourist MRP &amp; Price Gouge Viability Analyzer
                </h2>
                <p className="text-xs text-slate-500">
                  Is the vendor selling at fair statutory MRP or upselling a foreigner? (e.g. ₹10 biscuit for ₹200 vs ₹10).
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                Legal Metrology Rules 2011 Active
              </span>
            </div>
          </div>

          {/* Quick Scenario Preset Chips */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              Quick-Test Real India Traveler Scenarios:
            </label>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_PRICE_GOUGE_ITEMS.map((preset, idx) => {
                const isSelected = selectedGougeItem.itemName === preset.itemName;
                return (
                  <button
                    key={idx}
                    type="button"
                    id={`preset-gouge-item-${idx}`}
                    onClick={() => handleSelectPresetGouge(preset)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <span>{preset.itemName.split('(')[0]}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-800'
                    }`}>
                      ₹{preset.quotedPriceInr}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Custom Item Price & Locality Evaluator */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            {/* Left Form */}
            <div className="md:col-span-5 space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Item / Service Name:
                </label>
                <input
                  type="text"
                  id="input-gouge-item-name"
                  value={customItemName}
                  onChange={(e) => setCustomItemName(e.target.value)}
                  placeholder="e.g. Parle-G Biscuit, Cutting Chai, Bottled Water"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Shopkeeper Quoted (₹):
                  </label>
                  <input
                    type="number"
                    id="input-gouge-quoted"
                    value={customQuotedPrice}
                    onChange={(e) => setCustomQuotedPrice(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono font-bold focus:ring-2 focus:ring-blue-500 bg-white text-rose-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Statutory MRP (₹):
                  </label>
                  <input
                    type="number"
                    id="input-gouge-mrp"
                    value={customStatutoryMrp}
                    onChange={(e) => setCustomStatutoryMrp(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono font-bold focus:ring-2 focus:ring-blue-500 bg-white text-emerald-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Locality / Place Type:
                  </label>
                  <select
                    id="select-gouge-location"
                    value={customLocationType}
                    onChange={(e: any) => setCustomLocationType(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-300 text-xs bg-white font-medium focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Roadside Stall">Roadside Stall / Tapri</option>
                    <option value="Tourist Attraction Kiosk">Tourist Attraction Kiosk</option>
                    <option value="Casual Cafe">Casual City Cafe</option>
                    <option value="5-Star Luxury Hotel">5-Star Luxury Hotel</option>
                    <option value="Airport Lounge">Airport Lounge</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Packaging Type:
                  </label>
                  <select
                    id="select-gouge-packaged"
                    value={customIsPackaged ? 'yes' : 'no'}
                    onChange={(e) => setCustomIsPackaged(e.target.value === 'yes')}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-300 text-xs bg-white font-medium focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="yes">Packaged FMCG (Printed MRP)</option>
                    <option value="no">Fresh / Unpackaged Food</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                id="btn-evaluate-price-ai"
                onClick={handleEvaluateCustomPrice}
                disabled={isEvaluatingPrice}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                {isEvaluatingPrice ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Run AI Price Viability Analysis</span>
                  </>
                )}
              </button>
            </div>

            {/* Right Assessment Verdict */}
            <div className="md:col-span-7 p-4 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between space-y-3 shadow-sm">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-700 uppercase">
                    AI Price Viability &amp; Fairness Score
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-extrabold font-mono px-3 py-0.5 rounded-full ${
                      selectedGougeItem.fairnessScore >= 8
                        ? 'bg-emerald-100 text-emerald-800'
                        : selectedGougeItem.fairnessScore >= 5
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800 animate-pulse'
                    }`}>
                      {selectedGougeItem.fairnessScore} / 10 SCORE
                    </span>
                  </div>
                </div>

                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-slate-900">
                      Verdict: {selectedGougeItem.verdict}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {selectedGougeItem.explanation}
                  </p>
                </div>

                <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-700 space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-blue-600" />
                    <span>AI Domain Inquiries &amp; Recommendations:</span>
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                    {selectedGougeItem.aiQuestioning.map((q, idx) => (
                      <li key={idx}>{q}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">
                  Quoted: <strong className="text-rose-600">₹{selectedGougeItem.quotedPriceInr}</strong> &bull; Fair MRP: <strong className="text-emerald-700">₹{selectedGougeItem.statutoryMrpInr}</strong>
                </span>
                <button
                  type="button"
                  id="btn-apply-price-to-pay"
                  onClick={() => setSendAmountInr(selectedGougeItem.quotedPriceInr)}
                  className="px-3 py-1.5 rounded-lg bg-orange-50 text-orange-700 hover:bg-orange-100 font-bold border border-orange-200 transition-all cursor-pointer"
                >
                  Set ₹{selectedGougeItem.quotedPriceInr} in UPI Terminal &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: DYNAMIC TRAVEL LIGHTNING NODE A -> B -> C (FOREIGNERS ONLY) */}
      {/* ========================================================================= */}
      {isForeigner && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-extrabold text-slate-900 uppercase">
                Dynamic Lightning Travel Route &bull; Node A &rarr; Node B &rarr; Node C (Merchant INR)
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              ● 0% Slippage &bull; Live HTLC Path
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {LIGHTNING_TRAVEL_NODES.map((node, idx) => (
              <div
                key={node.nodeId}
                className={`p-4 rounded-2xl border text-xs space-y-2 relative overflow-hidden transition-all ${
                  idx === 2
                    ? 'bg-emerald-50/70 border-emerald-300'
                    : idx === 1
                    ? 'bg-blue-50/70 border-blue-300'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white text-slate-800 shadow-xs border border-slate-200">
                    NODE {idx === 0 ? 'A (Origin)' : idx === 1 ? 'B (Mesh Router)' : 'C (India Merchant)'}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-700">
                    {node.latencyMs}ms Latency
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900">{node.nodeName}</h4>
                  <p className="text-[11px] text-slate-500 font-mono">{node.location}</p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 font-mono text-[10px] space-y-0.5 text-slate-600">
                  <div>Channel Capacity: {(node.channelCapacitySats / 100000000).toFixed(2)} BTC</div>
                  <div>Routing Fee: {node.feeSats} sat ({node.ipGeo})</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: UNIVERSAL SEND & SCANNER TERMINAL */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Universal Pay Terminal */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Send className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-900 uppercase">
                {isForeigner ? 'Instant UPI Settle & Dust-Free Terminal' : 'Instant Indian UPI Settle Terminal'}
              </h2>
            </div>
            <span className="text-xs font-mono text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full font-bold">
              ⚡ Sub-Second Settle
            </span>
          </div>

          {/* Mode Tabs */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-2xl text-xs font-semibold">
            <button
              type="button"
              id="mode-camera-scanner"
              onClick={() => {
                setActiveSendMode('camera_scanner');
                setRecipientHandleOrAddress('chaipoint.delhi@icici');
              }}
              className={`py-2 rounded-xl transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                activeSendMode === 'camera_scanner'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Camera Scan QR</span>
            </button>
            <button
              type="button"
              id="mode-dosra-wallet"
              onClick={() => {
                setActiveSendMode('dosra_wallet');
                setRecipientHandleOrAddress('@aarav.sat');
              }}
              className={`py-2 rounded-xl transition-all text-center cursor-pointer ${
                activeSendMode === 'dosra_wallet'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Dosra Wallet
            </button>
            <button
              type="button"
              id="mode-upi-merchant"
              onClick={() => {
                setActiveSendMode('upi_merchant');
                setRecipientHandleOrAddress('sharmastore@okhdfcbank');
              }}
              className={`py-2 rounded-xl transition-all text-center cursor-pointer ${
                activeSendMode === 'upi_merchant'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              UPI VPA ID
            </button>
          </div>

          {/* Payment Form */}
          <form onSubmit={handleExecutePayment} className="space-y-4">
            {/* Camera Viewfinder Simulation if active */}
            {activeSendMode === 'camera_scanner' && (
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3 relative overflow-hidden border border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-mono text-emerald-400 font-bold">UPI QR Live Viewfinder</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">BharatPe &bull; Paytm &bull; PhonePe &bull; GPay</span>
                </div>

                <div className="h-28 rounded-xl border-2 border-dashed border-blue-400/50 bg-black/40 flex items-center justify-center relative">
                  <div className="text-center space-y-1">
                    <QrCode className="w-8 h-8 text-blue-400 mx-auto animate-pulse" />
                    <span className="text-[11px] font-mono text-slate-300 block">
                      Targeting QR Code: <strong className="text-white">{scannedMerchantName}</strong>
                    </span>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-slate-400 truncate">
                  Decoded VPA: <span className="text-emerald-400 font-bold">{recipientHandleOrAddress}</span>
                </div>
              </div>
            )}

            {/* Recipient Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {activeSendMode === 'dosra_wallet'
                  ? 'Recipient Sovereign Handle or LNURL Address:'
                  : activeSendMode === 'camera_scanner'
                  ? 'Merchant UPI VPA (Auto-scanned):'
                  : 'Indian Merchant UPI ID / VPA:'}
              </label>
              <input
                type="text"
                id="payment-recipient-input"
                value={recipientHandleOrAddress}
                onChange={(e) => setRecipientHandleOrAddress(e.target.value)}
                placeholder="merchant@upi"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-xs font-bold text-slate-900 bg-slate-50/50 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Amount input in INR */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700">
                  Amount to Pay (INR):
                </label>
                <span className="text-xs font-mono font-bold text-orange-600">
                  ≈ {sendAmountSats.toLocaleString()} satoshis
                </span>
              </div>
              <div className="relative">
                <span className="text-slate-400 font-mono font-bold text-sm absolute left-3 top-1/2 -translate-y-1/2">
                  ₹
                </span>
                <input
                  type="number"
                  id="payment-amount-inr"
                  value={sendAmountInr}
                  onChange={(e) => setSendAmountInr(Math.max(1, Number(e.target.value)))}
                  required
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-300 font-mono text-sm font-bold text-slate-900 bg-slate-50/50 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Quick Amount Buttons */}
              <div className="flex flex-wrap gap-2 pt-2">
                {[10, 50, 200, 500, 2000, 5000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setSendAmountInr(amt)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold border transition-all cursor-pointer ${
                      sendAmountInr === amt
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    ₹{amt.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>
            </div>

            {/* BITCOIN DUSTBIN & UTXO DUST AVOIDANCE */}
            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Coins className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-bold text-slate-900">
                    Bitcoin Dustbin &amp; Change Optimizer
                  </span>
                </div>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  isDustCreated ? 'bg-amber-200 text-amber-900' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {isDustCreated ? `⚠️ Change ${changeSatsGenerated} sats (<546 dust)` : 'Clean Zero-Dust Route'}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 text-[11px]">
                  Auto-Sweep micro-sats to Sovereign Dustbin:
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoSweepDustToDustbin}
                    onChange={(e) => setAutoSweepDustToDustbin(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              id="execute-payment-btn"
              disabled={isSimulatingPayment}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all cursor-pointer"
            >
              {isSimulatingPayment ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>
                    Settle ₹{sendAmountInr.toLocaleString('en-IN')} ({sendAmountSats.toLocaleString()} sats) via UPI
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Payment Success Card & Soundbox */}
          {paymentSuccessData && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="text-xs font-bold font-mono text-emerald-900">
                    Payment Settled with Cryptographic Finality
                  </span>
                </div>
                {soundboxPlaying && (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-orange-600 bg-orange-100 px-2.5 py-0.5 rounded-full animate-bounce">
                    <Volume2 className="w-3.5 h-3.5" />
                    Soundbox: ₹{paymentSuccessData.amountInr} Received!
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-emerald-200 text-emerald-900">
                <div>
                  <span className="text-[10px] text-emerald-700 block">Preimage Hash:</span>
                  <span className="font-bold truncate block">{paymentSuccessData.preimage}</span>
                </div>
                <div>
                  <span className="text-[10px] text-emerald-700 block">Finality Time:</span>
                  <span className="font-bold">{paymentSuccessData.settlementTime}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Visual Animation of Sats Flow & Blockchain Simulations */}
        <div className="lg:col-span-6 space-y-5">
          {/* Animated Route Flow Visualizer */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900 uppercase">
                  Lightning Liquidity Mesh Visualizer
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                Sub-Second Propagation
              </span>
            </div>

            {/* Animation Stage */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 relative overflow-hidden">
              <div className="flex items-center justify-between relative z-10">
                {/* Node 1: Sender */}
                <div className="text-center space-y-1">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div className="text-[11px] font-bold text-slate-900 font-mono">
                    {isForeigner ? 'You (Traveler)' : 'You (Sovereign)'}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">Sovereign BTC</div>
                </div>

                {/* Animated Flow line with moving Sat particle */}
                <div className="flex-1 px-4 relative flex items-center justify-center">
                  <div className="w-full h-1 bg-blue-200 rounded-full overflow-hidden relative">
                    <motion.div
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                      className="w-1/3 h-full bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 rounded-full"
                    />
                  </div>
                  <div className="absolute -top-3 px-2 py-0.5 rounded-full bg-orange-100 border border-orange-200 text-[10px] font-mono font-bold text-orange-800">
                    ⚡ {sendAmountSats.toLocaleString()} sats
                  </div>
                </div>

                {/* Node 2: Recipient / UPI Bridge */}
                <div className="text-center space-y-1">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="text-[11px] font-bold text-slate-900 font-mono truncate max-w-[110px]">
                    {recipientHandleOrAddress}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-mono font-bold">
                    Merchant UPI INR
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Block Hash Cryptographic Simulation Engine */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                <h3 className="text-sm font-bold text-slate-900 uppercase">
                  Blockchain Proof-of-Work Hash Simulator
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-500">
                SHA-256 Double Proof
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Every Bitcoin transaction settles against native Bitcoin blocks. Run cryptographic nonce simulations to verify block hash difficulty targets.
            </p>

            <button
              type="button"
              id="run-block-hash-btn"
              onClick={handleRunBlockHashSimulation}
              disabled={isMiningHash}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs font-mono flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {isMiningHash ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Cpu className="w-4 h-4" />
                  <span>Run Block Hash Nonce Simulation</span>
                </>
              )}
            </button>

            {minedBlockData && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono space-y-2">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>Block #{minedBlockData.blockNumber}</span>
                  <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[10px]">
                    ✓ {minedBlockData.status}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Calculated Block Hash:</span>
                  <span className="text-blue-700 font-bold break-all block">
                    {minedBlockData.blockHash}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-600 text-[11px] pt-1 border-t border-slate-200">
                  <span>Mined Nonce: <strong>{minedBlockData.nonce}</strong></span>
                  <span>Target: <strong>00000000...</strong></span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
