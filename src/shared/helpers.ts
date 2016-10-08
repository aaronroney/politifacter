import * as _ from 'lodash';

import { Statistics, Person } from './bll';

export function aggregateStatsForPeople(agg : Statistics, person : Person) : Statistics {
    var total = person.pants_count + person.false_count + person.barely_true_count + person.half_true_count + person.mostly_true_count + person.true_count;

    if(total === 0)
        return agg;

    agg.people.push(person);

    agg.pantsOnFireArray.push(person.pants_count);
    agg.falseArray.push(person.false_count);
    agg.mostlyFalseArray.push(person.barely_true_count);
    agg.halfTrueArray.push(person.half_true_count);
    agg.mostlyTrueArray.push(person.mostly_true_count);
    agg.trueArray.push(person.true_count);
    agg.totalArray.push(total);

    return agg;
}

export function round(num: number, decimalPlaces: number) : number {
    var factor = Math.pow(10, decimalPlaces)
    return Math.round(factor * num) / factor;
}

var percentString = '=';
export function printStatistics(stats: Statistics) {
    console.log();
    console.log(`Selectors: ${stats.selectors}`);
    console.log();
    console.log(`Number of people in selection: ${stats.numPeople}`);
    console.log(`Number of statements in selection: ${stats.numTotal}`);
    console.log(`Honesty score: ${round(stats.percentTrue + stats.percentMostlyTrue, 2)}%`);
    console.log(`Lying score: ${round(stats.percentPantsOnFire + stats.percentFalse + stats.percentMostlyFalse, 2)}%`);
    console.log();
    console.log(`            True : [${_.repeat(percentString, stats.percentTrue)}] ${stats.percentTrue} ± ${stats.moePercentTrue}% (${stats.numTrue})`);
    console.log(`     Mostly True : [${_.repeat(percentString, stats.percentMostlyTrue)}] ${stats.percentMostlyTrue} ± ${stats.moePercentMostlyTrue}% (${stats.numMostlyTrue})`);
    console.log(`       Half True : [${_.repeat(percentString, stats.percentHalfTrue)}] ${stats.percentHalfTrue} ± ${stats.moePercentHalfTrue}% (${stats.numHalfTrue})`);
    console.log(`    Mostly False : [${_.repeat(percentString, stats.percentMostlyFalse)}] ${stats.percentMostlyFalse} ± ${stats.moePercentMostlyFalse}% (${stats.numMostlyFalse})`);
    console.log(`           False : [${_.repeat(percentString, stats.percentFalse)}] ${stats.percentFalse} ± ${stats.moePercentFalse}% (${stats.numFalse})`);
    console.log(`   Pants On Fire : [${_.repeat(percentString, stats.percentPantsOnFire)}] ${stats.percentPantsOnFire} ± ${stats.moePercentPantsOnFire}% (${stats.numPantsOnFire})`);
    console.log();
}