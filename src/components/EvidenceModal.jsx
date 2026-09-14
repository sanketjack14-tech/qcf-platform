import React, { useState } from 'react';
import { 
  X, Mic, Video, Image, FileText, Globe, MessageSquare, 
  Upload, Trash2, CheckCircle2, Play, Pause, ExternalLink, Sparkles 
} from 'lucide-react';

export default function EvidenceModal({ statement, isOpen, onClose, evidenceList, onAddEvidence, onDeleteEvidence }) {
  const [activeTab, setActiveTab] = useState('text');
  
  // Text state
  const [textInput, setTextInput] = useState('');
  
  // Link state
  const [linkTitle, setLinkTitle] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  
  // Media simulation state
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [audioTimer, setAudioTimer] = useState(0);
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadNote, setUploadNote] = useState('');

  if (!isOpen || !statement) return null;

  const handleSimulateAudioRecording = () => {
    if (!isRecordingAudio) {
      setIsRecordingAudio(true);
      setAudioTimer(0);
      const interval = setInterval(() => {
        setAudioTimer(prev => {
          if (prev >= 12) {
            clearInterval(interval);
            setIsRecordingAudio(false);
            // Save voice note
            onAddEvidence({
              id: 'ev-' + Date.now(),
              statementId: statement.id,
              type: 'audio',
              title: `Voice Note - Careers Guidance (${new Date().toLocaleTimeString()})`,
              url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
              duration: '0:12',
              date: new Date().toLocaleDateString(),
              note: uploadNote || 'Recorded voice interview with head counsellor.'
            });
            setUploadNote('');
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      setIsRecordingAudio(false);
    }
  };

  const handleFileUploadSim = (type) => {
    const defaultTitles = {
      image: 'Careers Hub Bulletin Board & Workshop Photo.png',
      video: 'Student Career Fair & Industry Session.mp4',
      file: 'KHDA Careers Policy Framework 2025-2029.pdf',
    };

    const defaultUrls = {
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      file: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    };

    onAddEvidence({
      id: 'ev-' + Date.now(),
      statementId: statement.id,
      type: type,
      title: selectedFile ? selectedFile.name : defaultTitles[type],
      url: defaultUrls[type],
      date: new Date().toLocaleDateString(),
      note: uploadNote || `Uploaded evidence document for standard ${statement.code}`
    });

    setSelectedFile(null);
    setUploadNote('');
  };

  const handleAddLink = (e) => {
    e.preventDefault();
    if (!linkUrl) return;
    onAddEvidence({
      id: 'ev-' + Date.now(),
      statementId: statement.id,
      type: 'link',
      title: linkTitle || linkUrl,
      url: linkUrl.startsWith('http') ? linkUrl : `https://${linkUrl}`,
      date: new Date().toLocaleDateString(),
      note: uploadNote || 'External portal verification link.'
    });
    setLinkTitle('');
    setLinkUrl('');
    setUploadNote('');
  };

  const handleAddText = (e) => {
    e.preventDefault();
    if (!textInput.trim()) return;
    onAddEvidence({
      id: 'ev-' + Date.now(),
      statementId: statement.id,
      type: 'text',
      title: 'Written Rationale & Narrative',
      content: textInput,
      date: new Date().toLocaleDateString()
    });
    setTextInput('');
  };

  const currentStatementEvidences = evidenceList.filter(e => e.statementId === statement.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-emerald-100 w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-[#16362B] text-white p-5 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-600 text-white font-bold text-xs px-2.5 py-0.5 rounded-full">
                Standard {statement.code}
              </span>
              <span className="text-emerald-300 text-xs font-semibold uppercase tracking-wider">
                Multi-Modal Evidence Portal
              </span>
            </div>
            <h3 className="text-base font-bold mt-1 text-emerald-50 line-clamp-2">
              {statement.statement}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-emerald-800/60 hover:bg-emerald-700 text-emerald-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Tab Selector Buttons matching prototype pills */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2.5">
              Select Evidence Format To Submit
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'text', label: 'Text Note', icon: MessageSquare },
                { id: 'audio', label: 'Audio Voice Note', icon: Mic },
                { id: 'video', label: 'Video Clip', icon: Video },
                { id: 'image', label: 'Photo / Graphic', icon: Image },
                { id: 'file', label: 'PDF / Document', icon: FileText },
                { id: 'link', label: 'Website Link', icon: Globe }
              ].map(tab => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                      active
                        ? 'bg-[#2C6450] text-white shadow-sm ring-2 ring-emerald-600/30'
                        : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Input Area based on active tab */}
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-5">
            {activeTab === 'text' && (
              <form onSubmit={handleAddText} className="space-y-3">
                <label className="block text-xs font-bold text-emerald-950">
                  Written Narrative & Explanation
                </label>
                <textarea
                  rows={4}
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Provide detailed description of how the school meets this career guidance standard..."
                  className="w-full text-xs p-3 rounded-lg border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                ></textarea>
                <button
                  type="submit"
                  disabled={!textInput.trim()}
                  className="px-4 py-2 bg-[#2C6450] hover:bg-[#16362B] disabled:opacity-50 text-white font-bold text-xs rounded-lg flex items-center gap-2 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" /> Add Text Narrative
                </button>
              </form>
            )}

            {activeTab === 'audio' && (
              <div className="space-y-4">
                <div className="text-xs font-bold text-emerald-950">Record or Attach Audio Evidence</div>
                <div className="bg-white border border-emerald-200 rounded-xl p-4 flex flex-col items-center justify-center gap-3 text-center">
                  <div className={`p-4 rounded-full ${isRecordingAudio ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-emerald-100 text-emerald-800'}`}>
                    <Mic className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">
                      {isRecordingAudio ? `Recording in progress... (${audioTimer}s)` : 'Record Voice Interview / Audio Note'}
                    </p>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      Record student feedback, counsellor explanation, or parent voice testimonial.
                    </p>
                  </div>
                  <button
                    onClick={handleSimulateAudioRecording}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-colors ${
                      isRecordingAudio 
                        ? 'bg-red-600 hover:bg-red-700 text-white' 
                        : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                    }`}
                  >
                    <Mic className="w-4 h-4" />
                    {isRecordingAudio ? 'Stop & Save Recording' : 'Start Recording Audio'}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'video' && (
              <div className="space-y-3">
                <label className="block text-xs font-bold text-emerald-950">Upload Video Evidence (MP4 / MOV)</label>
                <div className="border-2 border-dashed border-emerald-200 rounded-xl p-6 bg-white text-center hover:bg-emerald-50/50 transition-colors">
                  <Video className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <p className="text-xs font-bold text-gray-800">Upload Careers Fair or Workshop Video</p>
                  <p className="text-[11px] text-gray-500 mt-1">Supports HD video recordings up to 500MB</p>
                  <button
                    onClick={() => handleFileUploadSim('video')}
                    className="mt-3 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg inline-flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" /> Upload Sample Video
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'image' && (
              <div className="space-y-3">
                <label className="block text-xs font-bold text-emerald-950">Upload Photo / Infographic</label>
                <div className="border-2 border-dashed border-emerald-200 rounded-xl p-6 bg-white text-center hover:bg-emerald-50/50 transition-colors">
                  <Image className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <p className="text-xs font-bold text-gray-800">Drag and drop photo evidence or click to browse</p>
                  <p className="text-[11px] text-gray-500 mt-1">PNG, JPG, WEBP photos of bulletin boards, student events</p>
                  <button
                    onClick={() => handleFileUploadSim('image')}
                    className="mt-3 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg inline-flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" /> Upload Sample Photo
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'file' && (
              <div className="space-y-3">
                <label className="block text-xs font-bold text-emerald-950">Upload Policy or PDF Document</label>
                <div className="border-2 border-dashed border-emerald-200 rounded-xl p-6 bg-white text-center hover:bg-emerald-50/50 transition-colors">
                  <FileText className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <p className="text-xs font-bold text-gray-800">Upload Careers Curriculum PDF or School Policy</p>
                  <p className="text-[11px] text-gray-500 mt-1">PDF, DOCX, XLSX documents</p>
                  <button
                    onClick={() => handleFileUploadSim('file')}
                    className="mt-3 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg inline-flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" /> Upload Sample PDF Document
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'link' && (
              <form onSubmit={handleAddLink} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-emerald-950 mb-1">Link Title / Label</label>
                  <input
                    type="text"
                    value={linkTitle}
                    onChange={(e) => setLinkTitle(e.target.value)}
                    placeholder="e.g. Dubai Future Academy Careers Portal"
                    className="w-full text-xs p-2.5 rounded-lg border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-emerald-950 mb-1">Website URL</label>
                  <input
                    type="url"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full text-xs p-2.5 rounded-lg border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!linkUrl}
                  className="px-4 py-2 bg-[#2C6450] hover:bg-[#16362B] disabled:opacity-50 text-white font-bold text-xs rounded-lg inline-flex items-center gap-2"
                >
                  <Globe className="w-4 h-4" /> Add External Website Link
                </button>
              </form>
            )}
          </div>

          {/* Attached Evidence List for this Statement */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2">
                <span>Submitted Evidence Log</span>
                <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-[10px]">
                  {currentStatementEvidences.length} items
                </span>
              </h4>
            </div>

            {currentStatementEvidences.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-gray-500 text-xs">
                No evidence submitted for this standard yet. Use the tabs above to attach files or notes.
              </div>
            ) : (
              <div className="space-y-2.5">
                {currentStatementEvidences.map(ev => (
                  <div key={ev.id} className="bg-white border border-emerald-100 rounded-xl p-3.5 flex items-start justify-between gap-3 shadow-2xs hover:border-emerald-300 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 shrink-0">
                        {ev.type === 'audio' && <Mic className="w-4 h-4" />}
                        {ev.type === 'video' && <Video className="w-4 h-4" />}
                        {ev.type === 'image' && <Image className="w-4 h-4" />}
                        {ev.type === 'file' && <FileText className="w-4 h-4" />}
                        {ev.type === 'link' && <Globe className="w-4 h-4" />}
                        {ev.type === 'text' && <MessageSquare className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-900">{ev.title}</div>
                        {ev.content && (
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2 italic bg-gray-50 p-2 rounded-md">
                            "{ev.content}"
                          </p>
                        )}
                        {ev.url && (
                          <a
                            href={ev.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:underline mt-1"
                          >
                            <span>Open Attachment / Preview</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        <div className="text-[10px] text-gray-400 mt-1 flex items-center gap-2">
                          <span>Added {ev.date}</span>
                          <span>•</span>
                          <span className="capitalize">{ev.type} evidence</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onDeleteEvidence(ev.id)}
                      className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove Evidence"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 border-t border-emerald-100 p-4 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            All submitted evidence is securely encrypted & logged for KHDA inspection.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            Done & Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
