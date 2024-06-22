from transformers import pipeline

class Summary:
    def __init__(self, pipeline) -> None:
        self.pipeline = pipeline
    
    def data_analysis(self, messages):
        results = []
        for message in messages:
            results.append(self.pipeline(message))
        return results
    
    def top(self, analysis_1):
        analysis_1 = analysis_1[0]
        top = None
        score = 0
        for d in analysis_1:
            if score < d['score']:
                top = d['label']
        return top
    
    def analyse(self, messages):
        analysis = self.data_analysis(messages)
        res = {}
        total = len(analysis)
        for one_analysis in analysis:
            top_score = self.top(one_analysis)
            res[top_score] = res.get(top_score, 0) + 1
        for key in res:
            res[key] = float(res[key] / total)
        return res

MODEL = "cardiffnlp/tweet-topic-21-multi"
classifier = pipeline("text-classification", model=MODEL, tokenizer=MODEL, top_k=None)
summarizer = Summary(classifier)


