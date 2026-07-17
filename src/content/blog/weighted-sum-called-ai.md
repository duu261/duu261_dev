---
title: My course project made me call a weighted sum AI
date: 2026-07-17
tag: java
hook: The rubric said AI slot allocation. The code said multiply, add, pick max. I had to defend both.
context: FPT University · SWP391
draft: false
---

SWP391 at FPT University is a teamwork course subject. It also came with four research questions. Three of them wanted proof that an "AI allocation algorithm" improves parking efficiency. So I built the algorithm. Then I had to explain to a panel of instructors why four multiplications and three additions count as AI.

## The algorithm

A driver pulls in. The system picks a parking slot. Here is what it looks at:

| Criterion | Weight | Logic |
|---|---|---|
| Vehicle type match | 40 | Does this floor take this kind of vehicle? |
| Floor load balance | 30 | How empty is this floor compared to the others? |
| Distance to entry | 20 | Lower floor means closer to the gate. |
| Peak-hour bonus | 10 | 7-9 AM or 5-7 PM? Favor emptier floors. |

```file title="SlotAllocationService.java - the scoring function" status="production"
private static final int WEIGHT_VEHICLE_TYPE = 40;
private static final int WEIGHT_LOAD_BALANCE = 30;
private static final int WEIGHT_DISTANCE = 20;
private static final int WEIGHT_PEAK_HOUR = 10;

private ScoreBreakdown score(ParkingSlot slot, Long vehicleTypeId, ...) {
    double vtScore   = vehicleTypeScore(floor, vehicleTypeId);
    double loadScore = availableRatio * WEIGHT_LOAD_BALANCE;
    double distScore = (double) WEIGHT_DISTANCE / floor.getLevel();
    double peakScore = peak ? availableRatio * WEIGHT_PEAK_HOUR : 0;

    return new ScoreBreakdown(slot, vtScore, loadScore, distScore, peakScore);
}
```

That is the whole thing. Four weights, multiply, add, pick the max. No training run. No model file. No gradient descent. Excel could do it.

## The defense

The rubric still said AI. The research questions still needed answering: does allocation beat free choice, which criteria matter most, does peak-hour utilization improve. So I had to stand there and argue that this function qualified.

The argument that landed:

```blog-diagram
Human chooses slot ──▶ One criterion (usually "closest")

Automated allocation ──▶ Four criteria ──▶ Weighted sum ──▶ Best slot
                           │
                           └── Vehicle type · Load balance · Distance · Peak hour
```

The system decides without a human. It weighs four things at once. No single criterion produces the answer alone. And the breakdown is fully exposed - the API returns every sub-score, so the driver sees "slot B scored 85: perfect vehicle match, floor is nearly empty, close to the gate."

The panel did not think they were looking at deep learning. They saw a transparent system with defensible weights that measurably beat manual choice. That was enough.

> **警告 WAR STORY -** I almost built an admin UI to let managers tune the weights per building. Week six I realized that was extra tables and endpoints for a feature nobody would touch. The weights are four constants in one file. Somebody wants different numbers, they change them and recompile. That is plenty for ten weeks.

## What this actually is

Automated decision-making with explicit rules. Heuristic scoring, multi-factor ranking, rule-based optimization - pick your label. They are all more accurate than AI. But the academic framing was not optional. The research component needed the word to justify the questions. So the label opened the door, and the implementation actually answered what was asked.

It did make me look differently at every production feature that ships with AI in the name. A few signals, a scoring function, a threshold. Some have real models underneath. Plenty do not.

## What transfers

If the rubric wants AI, build something you can explain in two minutes without slides. Expose every number. Make the weights visible. When the panel asks why slot B won, you point at the breakdown and walk them through it. A black box would have been ten times harder to defend than four integer constants in a Java file. Because with a black box you cannot point at anything.
